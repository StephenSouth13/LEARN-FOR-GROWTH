'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Users, FileText, Settings, LogOut, Download, Trash2, Plus, Upload, Globe, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

// --- Interface Definitions ---
interface Registration {
  id: string
  fullName: string
  email: string
  phone: string
  organization: string
  registeredAt: string
}

interface Speaker {
  id: string
  name: string
  title: string
  image: string
  bio: string
}

interface Sponsor {
  id: string
  name: string
  type: string
}

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number'
  required: boolean
  placeholder: string
}

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  // --- State Management ---
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [bannerImageUrl, setBannerImageUrl] = useState('')

  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [editingField, setEditingField] = useState<FormField | null>(null)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<'speaker' | 'sponsor' | 'faq' | 'field' | null>(null)

  // --- Effects ---
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  // --- Data Fetching ---
  const fetchData = async () => {
    // Fetch Speakers
    const { data: speakersData } = await supabase.from('speakers').select('*').order('created_at')
    if (speakersData) setSpeakers(speakersData)

    // Fetch Sponsors
    const { data: sponsorsData } = await supabase.from('sponsors').select('*').order('created_at')
    if (sponsorsData) setSponsors(sponsorsData)

    // Fetch FAQs
    const { data: faqsData } = await supabase.from('faqs').select('*').order('created_at')
    if (faqsData) setFaqs(faqsData)

    // Fetch Registrations
    const { data: registrationsData } = await supabase.from('registrations').select('*').order('registered_at', { ascending: false })
    if (registrationsData) {
        setRegistrations(registrationsData.map(r => ({ ...r, fullName: r.full_name, registeredAt: new Date(r.registered_at).toLocaleString() })))
    }

    // Fetch Settings (Banner & Form Fields)
    const { data: settingsData } = await supabase.from('settings').select('key, value')
    if (settingsData) {
      const bannerSetting = settingsData.find(s => s.key === 'banner_image_url')
      if (bannerSetting) setBannerImageUrl(bannerSetting.value)

      const formFieldsSetting = settingsData.find(s => s.key === 'form_fields')
      if (formFieldsSetting) setFormFields(JSON.parse(formFieldsSetting.value))
    }
  }

  // --- Authentication Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // --- Generic CRUD Handlers ---
  const handleSave = async <T extends { id: string }>(
    item: T | null,
    table: string,
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>,
    editingStateUpdater: React.Dispatch<React.SetStateAction<T | null>>
  ) => {
    if (!item) return
    
    const itemToSave = { ...item }
    // @ts-ignore
    delete itemToSave.id // Let Supabase handle ID for new items
    
    if (item.id.startsWith('new-')) { // New item
      const { data, error } = await supabase.from(table).insert(itemToSave).select()
      if (data) stateUpdater(prev => [...prev, data[0]])
      if (error) alert(`Error creating item: ${error.message}`)
    } else { // Existing item
      const { data, error } = await supabase.from(table).update(itemToSave).eq('id', item.id).select()
      if (data) stateUpdater(prev => prev.map(i => i.id === item.id ? data[0] : i))
      if (error) alert(`Error updating item: ${error.message}`)
    }
    editingStateUpdater(null)
    setIsModalOpen(false)
  }

  const handleDelete = async <T extends { id: string }>(
    id: string,
    table: string,
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) {
      alert(`Error deleting item: ${error.message}`)
    } else {
      stateUpdater(prev => prev.filter(i => i.id !== id))
    }
  }

  const openModal = <T extends { id: string }>(
    item: T | 'new',
    defaultItem: Omit<T, 'id'>,
    content: 'speaker' | 'sponsor' | 'faq' | 'field',
    editingStateUpdater: React.Dispatch<React.SetStateAction<T | null>>
  ) => {
    if (item === 'new') {
        // @ts-ignore
      editingStateUpdater({ id: `new-${Date.now()}`, ...defaultItem })
    } else {
      editingStateUpdater(item)
    }
    setModalContent(content)
    setIsModalOpen(true)
  }

  // --- Specific Handlers ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'speaker' | 'banner') => {
    const file = e.target.files?.[0]
    if (!file) return

    const filePath = `${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

    if (uploadError) {
      alert(`Error uploading image: ${uploadError.message}`)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)

    if (type === 'speaker' && editingSpeaker) {
      setEditingSpeaker({ ...editingSpeaker, image: publicUrl })
    } else if (type === 'banner') {
      setBannerImageUrl(publicUrl)
      await supabase.from('settings').upsert({ key: 'banner_image_url', value: publicUrl })
      alert('Banner image updated!')
    }
  }
  
  const saveFormFields = async () => {
    const { error } = await supabase.from('settings').upsert({ key: 'form_fields', value: JSON.stringify(formFields) })
    if (error) alert(`Error saving form fields: ${error.message}`)
    else alert('Form fields saved successfully!')
  }

  const downloadRegistrations = () => {
    const csv = [
      ['Full Name', 'Email', 'Phone', 'Organization', 'Registered At'],
      ...registrations.map(r => [r.fullName, r.email, r.phone, r.organization, r.registeredAt])
    ]
    const csvContent = "data:text/csv;charset=utf-8," + csv.map(row => row.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `registrations_${new Date().toISOString()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // --- Render Logic ---
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <Tabs defaultValue="registrations">
        <TabsList>
          <TabsTrigger value="registrations"><Users className="mr-2 h-4 w-4" />Registrations</TabsTrigger>
          <TabsTrigger value="speakers"><Users className="mr-2 h-4 w-4" />Speakers</TabsTrigger>
          <TabsTrigger value="sponsors"><Users className="mr-2 h-4 w-4" />Sponsors</TabsTrigger>
          <TabsTrigger value="faqs"><FileText className="mr-2 h-4 w-4" />FAQs</TabsTrigger>
          <TabsTrigger value="content"><Settings className="mr-2 h-4 w-4" />Content</TabsTrigger>
          <TabsTrigger value="form"><Settings className="mr-2 h-4 w-4" />Form Fields</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart3 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
          <TabsTrigger value="language"><Globe className="mr-2 h-4 w-4" />Language</TabsTrigger>
        </TabsList>

        {/* Registrations Tab */}
        <TabsContent value="registrations">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Registrations ({registrations.length})</h2>
              <Button onClick={downloadRegistrations}><Download className="mr-2 h-4 w-4" />Download CSV</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2">Full Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Organization</th>
                    <th className="p-2">Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map(r => (
                    <tr key={r.id} className="border-b">
                      <td className="p-2">{r.fullName}</td>
                      <td className="p-2">{r.email}</td>
                      <td className="p-2">{r.phone}</td>
                      <td className="p-2">{r.organization}</td>
                      <td className="p-2">{r.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Speakers Tab */}
        <TabsContent value="speakers">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Speakers</h2>
                    <Button onClick={() => openModal('new', { name: 'New Speaker', title: 'Title', image: '', bio: '' }, 'speaker', setEditingSpeaker)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Speaker
                    </Button>
                </div>
                <div className="space-y-4">
                    {speakers.map(speaker => (
                        <Card key={speaker.id} className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img src={speaker.image || '/placeholder.svg'} alt={speaker.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold">{speaker.name}</p>
                                    <p className="text-sm text-gray-500">{speaker.title}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => openModal(speaker, {}, 'speaker', setEditingSpeaker)}>Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(speaker.id, 'speakers', setSpeakers)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>

        {/* Sponsors Tab */}
        <TabsContent value="sponsors">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sponsors</h2>
                    <Button onClick={() => openModal('new', { name: 'New Sponsor', type: 'Sponsor' }, 'sponsor', setEditingSponsor)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Sponsor
                    </Button>
                </div>
                <div className="space-y-2">
                    {sponsors.map(sponsor => (
                        <Card key={sponsor.id} className="p-3 flex justify-between items-center">
                            <div>
                                <p className="font-bold">{sponsor.name}</p>
                                <p className="text-sm text-gray-500">{sponsor.type}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => openModal(sponsor, {}, 'sponsor', setEditingSponsor)}>Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(sponsor.id, 'sponsors', setSponsors)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">FAQs</h2>
                    <Button onClick={() => openModal('new', { question: 'New Question', answer: 'Answer' }, 'faq', setEditingFaq)}>
                        <Plus className="mr-2 h-4 w-4" /> Add FAQ
                    </Button>
                </div>
                <div className="space-y-2">
                    {faqs.map(faq => (
                        <Card key={faq.id} className="p-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{faq.question}</p>
                                    <p className="text-sm mt-1">{faq.answer}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 ml-4">
                                    <Button variant="outline" size="sm" onClick={() => openModal(faq, {}, 'faq', setEditingFaq)}>Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id, 'faqs', setFaqs)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Banner Image</h2>
            <div className="flex items-center gap-4">
              <img src={bannerImageUrl || '/placeholder.svg'} alt="Banner" className="w-64 h-auto rounded" />
              <div>
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
                <p className="text-sm text-gray-500 mt-2">Upload a new banner image.</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Form Fields Tab */}
        <TabsContent value="form">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Registration Form Fields</h2>
                    <div>
                        <Button onClick={() => openModal('new', { name: 'newField', label: 'New Field', type: 'text', required: false, placeholder: '' }, 'field', setEditingField)} className="mr-2">
                            <Plus className="mr-2 h-4 w-4" /> Add Field
                        </Button>
                        <Button onClick={saveFormFields}><Save className="mr-2 h-4 w-4" /> Save All Fields</Button>
                    </div>
                </div>
                {/* This part will be implemented in the next step */}
                <p>Form field management UI will be here.</p>
            </Card>
        </TabsContent>

        {/* Other Tabs (Placeholder) */}
        <TabsContent value="analytics"><Card className="p-4">Analytics coming soon.</Card></TabsContent>
        <TabsContent value="language"><Card className="p-4">Language settings coming soon.</Card></TabsContent>
      </Tabs>

      {/* --- Modal for Editing --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalContent === 'speaker' && (editingSpeaker?.id.startsWith('new-') ? 'Add Speaker' : 'Edit Speaker')}
              {modalContent === 'sponsor' && (editingSponsor?.id.startsWith('new-') ? 'Add Sponsor' : 'Edit Sponsor')}
              {modalContent === 'faq' && (editingFaq?.id.startsWith('new-') ? 'Add FAQ' : 'Edit FAQ')}
              {modalContent === 'field' && (editingField?.id.startsWith('new-') ? 'Add Form Field' : 'Edit Form Field')}
            </DialogTitle>
          </DialogHeader>
          
          {/* Speaker Form */}
          {modalContent === 'speaker' && editingSpeaker && (
            <div className="space-y-4 py-4">
              <Input value={editingSpeaker.name} onChange={e => setEditingSpeaker({...editingSpeaker, name: e.target.value})} placeholder="Name" />
              <Input value={editingSpeaker.title} onChange={e => setEditingSpeaker({...editingSpeaker, title: e.target.value})} placeholder="Title" />
              <Textarea value={editingSpeaker.bio} onChange={e => setEditingSpeaker({...editingSpeaker, bio: e.target.value})} placeholder="Bio" />
              <div className="flex items-center gap-4">
                <img src={editingSpeaker.image || '/placeholder.svg'} alt="Speaker" className="w-20 h-20 rounded-full object-cover" />
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'speaker')} />
              </div>
            </div>
          )}

          {/* Sponsor Form */}
          {modalContent === 'sponsor' && editingSponsor && (
            <div className="space-y-4 py-4">
              <Input value={editingSponsor.name} onChange={e => setEditingSponsor({...editingSponsor, name: e.target.value})} placeholder="Name" />
              <Input value={editingSponsor.type} onChange={e => setEditingSponsor({...editingSponsor, type: e.target.value})} placeholder="Type (e.g., Gold, Silver)" />
            </div>
          )}

          {/* FAQ Form */}
          {modalContent === 'faq' && editingFaq && (
            <div className="space-y-4 py-4">
              <Input value={editingFaq.question} onChange={e => setEditingFaq({...editingFaq, question: e.target.value})} placeholder="Question" />
              <Textarea value={editingFaq.answer} onChange={e => setEditingFaq({...editingFaq, answer: e.target.value})} placeholder="Answer" />
            </div>
          )}

          {/* Form Field Form (To be implemented) */}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (modalContent === 'speaker') handleSave(editingSpeaker, 'speakers', setSpeakers, setEditingSpeaker)
              if (modalContent === 'sponsor') handleSave(editingSponsor, 'sponsors', setSponsors, setEditingSponsor)
              if (modalContent === 'faq') handleSave(editingFaq, 'faqs', setFaqs, setEditingFaq)
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
