'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser' 
import type { User } from '@supabase/supabase-js'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Users, FileText, Settings, LogOut, Download, Trash2, Plus, Edit, Image as ImageIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Registration {
  id: string
  full_name: string
  email: string
  phone: string 
  organization: string 
  registered_at: string 
  fullName: string 
  registeredAt: string 
  [key: string]: any
}

interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  image_url: string
}

interface Sponsor {
  id: string
  name: string
  type: string
  logo_url: string
  website: string 
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

type EditableItem = Speaker | Sponsor | FAQ | FormField
type ItemType = 'speaker' | 'sponsor' | 'faq' | 'field'

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = getSupabaseBrowser()

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [bannerImageUrl, setBannerImageUrl] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null)
  const [editingType, setEditingType] = useState<ItemType | null>(null)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    
    try {
      const [speakersRes, sponsorsRes, faqsRes, registrationsRes, settingsRes] = await Promise.all([
        supabase.from('speakers').select('id, name, title, bio, image_url').order('created_at'),
        supabase.from('sponsors').select('id, name, type, logo_url, website').order('created_at'),
        supabase.from('faqs').select('*').order('created_at'),
        supabase.from('registrations').select('id, full_name, email, phone, organization, registered_at').order('registered_at', { ascending: false }),
        supabase.from('settings').select('key, value')
      ])

      if (speakersRes.data) setSpeakers(speakersRes.data as Speaker[])
      if (sponsorsRes.data) setSponsors(sponsorsRes.data as Sponsor[])
      if (faqsRes.data) setFaqs(faqsRes.data as FAQ[])
      
      if (registrationsRes.data) {
          const formattedRegistrations = registrationsRes.data.map((r: any) => ({
              ...r,
              fullName: r.full_name || '',
              organization: r.organization || '', 
              registeredAt: r.registered_at ? new Date(r.registered_at).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN')
          }))
          setRegistrations(formattedRegistrations as Registration[])
      }
      
      if (settingsRes.data) {
        const bannerSetting = settingsRes.data.find((s: any) => s.key === 'banner_image_url') 
        if (bannerSetting) setBannerImageUrl(bannerSetting.value || '')

        const formFieldsSetting = settingsRes.data.find((s: any) => s.key === 'form_fields') 
        if (formFieldsSetting?.value) {
          try {
            const parsed = typeof formFieldsSetting.value === 'string' ? JSON.parse(formFieldsSetting.value) : formFieldsSetting.value
            setFormFields(Array.isArray(parsed) ? parsed : [])
          } catch (e) {
            console.error("Error parsing form fields:", e)
            setFormFields([])
          }
        }
      }
    } catch (err) {
      console.error('Fetch data error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

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
    return () => authListener?.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user, fetchData])

  const openModal = (item: EditableItem | 'new', type: ItemType) => {
    setEditingType(type)
    setFileToUpload(null)

    if (item === 'new') {
      let defaultItem: any = { id: `new-${Date.now()}` }
      if (type === 'speaker') defaultItem = { ...defaultItem, name: '', title: '', image_url: '', bio: '' }
      if (type === 'sponsor') defaultItem = { ...defaultItem, name: '', type: '', logo_url: '', website: '' }
      if (type === 'faq') defaultItem = { ...defaultItem, question: '', answer: '' }
      if (type === 'field') defaultItem = { ...defaultItem, name: `field_${Date.now()}`, label: 'Trường mới', type: 'text', required: false, placeholder: '' }
      setEditingItem(defaultItem)
    } else {
      setEditingItem(item)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setEditingType(null)
    setFileToUpload(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingItem) return
    const { name, value } = e.target
    
    if (editingType === 'field' && name === 'label') {
        const fieldName = value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30)
        setEditingItem({ ...editingItem, name: fieldName, [name]: value } as FormField)
        return
    }
    
    setEditingItem({ ...editingItem, [name]: value })
  }
    
  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (!editingItem) return
    setEditingItem({ ...editingItem, [name]: checked })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0])
    }
  }

  const handleSave = async () => {
    if (!editingItem || !editingType) return
    
    if (editingType === 'field') {
      await handleFormFieldSave()
      return
    }
    
    setLoading(true)
    let itemToSave = { ...editingItem } as any

    try {
      if (fileToUpload) {
        const filePath = `public/${editingType}/${Date.now()}-${fileToUpload.name}`
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, fileToUpload)
        if (uploadError) {
          alert(`Lỗi tải ảnh lên: ${uploadError.message}`)
          return
        }
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
        if (editingType === 'speaker') itemToSave.image_url = publicUrl
        if (editingType === 'sponsor') itemToSave.logo_url = publicUrl
      }

      const { id, ...dbItem } = itemToSave
      const table = `${editingType}s`
      const isNew = id.startsWith('new-')
      let error: any = null

      if (isNew) {
        ({ error } = await supabase.from(table).insert([dbItem]))
      } else {
        ({ error } = await supabase.from(table).update(dbItem).eq('id', id))
      }

      if (error) {
        alert(`Lỗi ${isNew ? 'tạo mới' : 'cập nhật'}: ${error.message}`)
      } else {
        await fetchData()
        closeModal()
        alert(`Lưu ${editingType} thành công!`)
      }
    } catch (err) {
      console.error('Save error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, type: ItemType) => {
    if (!confirm('Bạn chắc chắn muốn xóa mục này?')) return
    
    if (type === 'field') {
      await handleFormFieldDelete(id)
      return
    }
    
    setLoading(true)
    try {
      const { error } = await supabase.from(`${type}s`).delete().eq('id', id)
      if (error) {
        alert(`Lỗi xóa: ${error.message}`)
      } else {
        await fetchData()
        alert(`Xóa ${type} thành công!`)
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }
    
  const handleFormFieldSave = async () => {
    if (!editingItem) return
    const field = editingItem as FormField
    
    if (!field.name || field.name.includes(' ')) {
        alert("Tên trường (Field Name) không được để trống và không được chứa khoảng trắng.")
        return
    }
    
    const updatedFields = field.id.startsWith('new-')
      ? [...formFields, { ...field, id: `field-${Date.now()}` }]
      : formFields.map(f => f.id === field.id ? field : f)
      
    setLoading(true)
    try {
      const { error } = await supabase.from('settings').upsert({ key: 'form_fields', value: JSON.stringify(updatedFields) }, { onConflict: 'key' })
      
      if (error) alert(`Lỗi lưu cấu hình Form: ${error.message}`)
      else {
        setFormFields(updatedFields)
        closeModal()
        alert('Lưu trường Form thành công!')
      }
    } catch (err) {
      console.error('Form field save error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFormFieldDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa trường này?')) return
    const updatedFields = formFields.filter(f => f.id !== id)
    setLoading(true)
    try {
      const { error } = await supabase.from('settings').upsert({ key: 'form_fields', value: JSON.stringify(updatedFields) }, { onConflict: 'key' })
      if (error) alert(`Lỗi xóa trường Form: ${error.message}`)
      else {
        setFormFields(updatedFields)
        alert('Xóa trường Form thành công!')
      }
    } catch (err) {
      console.error('Form field delete error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const filePath = `public/banner/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
      if (uploadError) {
        alert(`Lỗi tải ảnh banner lên: ${uploadError.message}`)
        return
      }

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
      const { error: settingsError } = await supabase.from('settings').upsert({ key: 'banner_image_url', value: publicUrl }, { onConflict: 'key' })
      
      if (settingsError) {
        alert(`Lỗi lưu URL banner: ${settingsError.message}`)
      } else {
        setBannerImageUrl(publicUrl)
        alert('Cập nhật ảnh banner thành công!')
      }
    } catch (err) {
      console.error('Banner upload error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }

  const downloadRegistrations = () => {
    const headers = formFields.length > 0 ? formFields.map(f => f.label) : ['Họ và tên', 'Email', 'Số điện thoại', 'Tổ chức']
    const keys = formFields.length > 0 ? formFields.map(f => f.name) : ['fullName', 'email', 'phone', 'organization']
    
    const csv = [
      ['\ufeff', ...headers, 'Thời gian ĐK'], 
      ...registrations.map(r => [
          '', 
        ...keys.map(key => {
          const value = r[key] ?? r[key.toLowerCase()] ?? ''
          return value
        }), 
        r.registeredAt
      ])
    ]
    
    const csvContent = csv.map(row => row.map(cell => `"${(cell || '-').toString().replace(/"/g, '""')}"`).join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `danh_sach_dang_ky_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(`Đăng nhập thất bại: ${error.message}`)
    } catch (err) {
      console.error('Login error:', err)
      alert(`Lỗi: ${err instanceof Error ? err.message : 'Không xác định'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const registrationsToday = useMemo(() => {
    const today = new Date().toDateString()
    return registrations.filter(r => new Date(r.registered_at).toDateString() === today).length
  }, [registrations])

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-xl font-semibold dark:bg-gray-950 dark:text-white">Đang tải dữ liệu...</div>
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <Card className="w-full max-w-sm p-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">Admin Panel 🔒</h1>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              Đăng nhập
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700">
        <h1 className="text-3xl font-extrabold text-blue-400 flex items-center gap-2">Admin Dashboard <Settings className='w-5 h-5'/></h1>
        <Button onClick={handleLogout} variant="outline" className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-100">
          <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
        </Button>
      </header>

      <Tabs defaultValue="registrations">
        <TabsList className="flex flex-wrap h-auto mb-6 bg-gray-800 p-1 rounded-xl shadow-lg border border-gray-700/50">
          <TabsTrigger value="registrations" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><Users className="h-4 w-4" />Đăng ký</TabsTrigger>
          <TabsTrigger value="analytics" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><BarChart3 className="h-4 w-4" />Thống kê</TabsTrigger>
          <TabsTrigger value="speakers" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><Users className="h-4 w-4" />Diễn giả</TabsTrigger>
          <TabsTrigger value="sponsors" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><ImageIcon className="h-4 w-4" />Hỗ trợ</TabsTrigger>
          <TabsTrigger value="faqs" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><FileText className="h-4 w-4" />FAQ</TabsTrigger>
          <TabsTrigger value="content" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><Settings className="h-4 w-4" />Ảnh bìa</TabsTrigger>
          <TabsTrigger value="form" className='flex-1 gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg hover:bg-gray-700 transition'><Settings className="h-4 w-4" />Form ĐK</TabsTrigger>
        </TabsList>

        <TabsContent value="registrations">
          <Card className="p-4 bg-gray-800 border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Danh sách Đăng ký ({registrations.length})</h2>
              <Button onClick={downloadRegistrations} className="bg-green-600 hover:bg-green-700"><Download className="mr-2 h-4 w-4" />Tải xuống CSV</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-700/50 border-b border-gray-600">
                  <tr>
                    {formFields.length > 0 
                      ? formFields.map(f => <th key={f.id} className="p-3 font-semibold">{f.label}</th>)
                      : ['Họ và tên', 'Email', 'Số điện thoại', 'Tổ chức'].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)
                    }
                    <th className="p-3 font-semibold">Thời gian ĐK</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr><td colSpan={formFields.length > 0 ? formFields.length + 1 : 5} className="p-4 text-center text-gray-500">Chưa có đăng ký nào.</td></tr>
                  ) : (
                    registrations.map(r => (
                      <tr key={r.id} className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors">
                        {formFields.length > 0 
                          ? formFields.map(f => <td key={f.id} className="p-3">{r[f.name]}</td>)
                          : <>
                            <td className="p-3">{r.fullName}</td>
                            <td className="p-3">{r.email}</td>
                            <td className="p-3">{r.phone}</td>
                            <td className="p-3">{r.organization}</td>
                          </>
                        }
                        <td className="p-3 text-xs text-gray-400">{r.registeredAt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6 bg-gray-800 border-gray-700 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Thống kê Tổng quan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-gray-700/50 rounded-xl border border-blue-500/30">
                <p className="text-gray-400 text-sm mb-2">Tổng đăng ký</p>
                <p className="text-4xl font-bold text-blue-400">{registrations.length}</p>
              </div>
              <div className="p-5 bg-gray-700/50 rounded-xl border border-green-500/30">
                <p className="text-gray-400 text-sm mb-2">Đăng ký hôm nay</p>
                <p className="text-4xl font-bold text-green-400">{registrationsToday}</p>
              </div>
              <div className="p-5 bg-gray-700/50 rounded-xl border border-yellow-500/30">
                <p className="text-gray-400 text-sm mb-2">Số tổ chức</p>
                <p className="text-4xl font-bold text-yellow-400">
                  {new Set(registrations.map(r => r.organization).filter(org => org)).size}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="speakers">
          <Card className="p-4 bg-gray-800 border-gray-700 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Diễn giả ({speakers.length})</h2>
                  <Button onClick={() => openModal('new', 'speaker')} className="bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" /> Thêm Diễn giả
                  </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {speakers.map(speaker => (
                      <Card key={speaker.id} className="p-4 flex flex-col bg-gray-700/30 border-gray-700">
                          <div className="flex items-center gap-4 mb-2">
                              <img src={speaker.image_url || '/placeholder.svg'} alt={speaker.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/50" />
                              <div className="flex-1">
                                  <p className="font-bold">{speaker.name}</p>
                                  <p className="text-sm text-primary">{speaker.title}</p>
                              </div>
                          </div>
                          <p className="text-sm text-gray-400 grow mb-4 line-clamp-3">{speaker.bio}</p>
                          <div className="flex gap-2 mt-auto">
                              <Button variant="outline" size="sm" onClick={() => openModal(speaker, 'speaker')} className='hover:bg-gray-600 border-gray-600'><Edit className="h-4 w-4"/></Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(speaker.id, 'speaker')}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                      </Card>
                  ))}
              </div>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors">
            <Card className="p-4 bg-gray-800 border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Đơn vị hỗ trợ ({sponsors.length})</h2>
                    <Button onClick={() => openModal('new', 'sponsor')} className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Thêm Đơn vị
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sponsors.map(sponsor => (
                        <Card key={sponsor.id} className="p-3 flex flex-col bg-gray-700/30 border-gray-700">
                            <div className="flex items-center gap-4 mb-2">
                                <img src={sponsor.logo_url || '/placeholder.svg'} alt={sponsor.name} className="w-16 h-16 object-contain p-1 border rounded-md border-gray-600 bg-white shrink-0" />
                                <div className="flex-1">
                                    <p className="font-bold">{sponsor.name}</p>
                                    <p className="text-sm text-primary">{sponsor.type}</p>
                                    <p className="text-xs text-gray-500 truncate">{sponsor.website}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <Button variant="outline" size="sm" onClick={() => openModal(sponsor, 'sponsor')} className='hover:bg-gray-600 border-gray-600'><Edit className="h-4 w-4"/></Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(sponsor.id, 'sponsor')}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>

        <TabsContent value="faqs">
            <Card className="p-4 bg-gray-800 border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Câu hỏi thường gặp ({faqs.length})</h2>
                    <Button onClick={() => openModal('new', 'faq')} className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Thêm FAQ
                    </Button>
                </div>
                <div className="space-y-2">
                    {faqs.map(faq => (
                        <Card key={faq.id} className="p-4 bg-gray-700/30 border-gray-700">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 pr-4">
                                    <p className="font-bold text-lg">{faq.question}</p>
                                    <p className="text-sm mt-1 text-gray-400">{faq.answer}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 ml-4">
                                    <Button variant="outline" size="sm" onClick={() => openModal(faq, 'faq')} className='hover:bg-gray-600 border-gray-600'><Edit className="h-4 w-4"/></Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id, 'faq')}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="p-6 bg-gray-800 border-gray-700 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Cập nhật Ảnh bìa</h2>
            <div className="space-y-4">
              <Label htmlFor="banner-upload" className='text-gray-300'>Tải ảnh lên (Tải lên sẽ tự động cập nhật URL)</Label>
              <Input id="banner-upload" type="file" accept="image/*" onChange={handleBannerImageUpload} className="bg-gray-700 border-gray-600 text-white" />
              
              <Label className='text-gray-300'>Xem trước ảnh bìa</Label>
              <div className="h-48 w-full border border-gray-600 rounded-lg overflow-hidden flex items-center justify-center bg-gray-700">
                <img src={bannerImageUrl || '/placeholder.svg'} alt="Banner preview" className="w-full h-full object-contain" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="form">
            <Card className="p-6 bg-gray-800 border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Quản lý Trường Form Đăng ký ({formFields.length})</h2>
                    <Button onClick={() => openModal('new', 'field')} className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Thêm Trường
                    </Button>
                </div>
                <div className="space-y-4">
                    {formFields.map((field) => (
                        <Card key={field.id} className="p-4 flex justify-between items-center bg-gray-700/30 border-gray-700">
                            <div>
                                <p className="font-bold">{field.label} <span className="font-normal text-gray-400">({field.name})</span></p>
                                <p className="text-sm text-gray-400">
                                    Loại: <span className="font-mono bg-gray-700/80 px-1 rounded">{field.type}</span> |
                                    Bắt buộc: <span className="font-semibold text-red-400">{field.required ? 'CÓ' : 'KHÔNG'}</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => openModal(field, 'field')} className='hover:bg-gray-600 border-gray-600'><Edit className="h-4 w-4"/></Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(field.id, 'field')}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-primary'>
                {editingType === 'speaker' && ((editingItem as Speaker)?.id.startsWith('new-') ? 'Thêm Diễn giả' : 'Chỉnh sửa Diễn giả')}
                {editingType === 'sponsor' && ((editingItem as Sponsor)?.id.startsWith('new-') ? 'Thêm Đơn vị Hỗ trợ' : 'Chỉnh sửa Đơn vị Hỗ trợ')}
                {editingType === 'faq' && ((editingItem as FAQ)?.id.startsWith('new-') ? 'Thêm Câu hỏi' : 'Chỉnh sửa Câu hỏi')}
                {editingType === 'field' && ((editingItem as FormField)?.id.startsWith('new-') ? 'Thêm Trường Form' : 'Chỉnh sửa Trường Form')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            
            {editingType === 'speaker' && editingItem && (
              <>
                <Label className='text-gray-300'>Tên</Label>
                <Input name="name" value={(editingItem as Speaker).name} onChange={handleInputChange} placeholder="Tên diễn giả" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Chức vụ</Label>
                <Input name="title" value={(editingItem as Speaker).title} onChange={handleInputChange} placeholder="Chức vụ" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Tiểu sử</Label>
                <Textarea name="bio" value={(editingItem as Speaker).bio} onChange={handleInputChange} placeholder="Tiểu sử" rows={5} className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Ảnh (Upload/URL)</Label>
                <div className="flex items-center gap-4">
                  <img src={fileToUpload ? URL.createObjectURL(fileToUpload) : (editingItem as Speaker).image_url || '/placeholder.svg'} alt="Speaker" className="w-20 h-20 rounded-full object-cover border-2 border-primary/50" />
                  <Input name="image_upload" type="file" accept="image/*" onChange={handleFileChange} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <Label className='text-gray-300'>URL Ảnh (Ghi đè nếu không upload)</Label>
                <Input name="image_url" value={(editingItem as Speaker).image_url} onChange={handleInputChange} placeholder="URL Ảnh" className="bg-gray-700 border-gray-600 text-white" />
              </>
            )}

            {editingType === 'sponsor' && editingItem && (
              <>
                <Label className='text-gray-300'>Tên đơn vị</Label>
                <Input name="name" value={(editingItem as Sponsor).name} onChange={handleInputChange} placeholder="Tên đơn vị" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Loại hỗ trợ</Label>
                <Input name="type" value={(editingItem as Sponsor).type} onChange={handleInputChange} placeholder="VD: Tổ chức chính, Tài trợ Vàng" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Website/Link</Label>
                <Input name="website" value={(editingItem as Sponsor).website} onChange={handleInputChange} placeholder="https://website.com" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Logo (Upload/URL)</Label>
                <div className="flex items-center gap-4">
                  <img src={fileToUpload ? URL.createObjectURL(fileToUpload) : (editingItem as Sponsor).logo_url || '/placeholder.svg'} alt="Sponsor Logo" className="w-20 h-20 object-contain p-1 border rounded-md border-gray-600 bg-white" />
                  <Input name="logo_upload" type="file" accept="image/*" onChange={handleFileChange} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <Label className='text-gray-300'>Logo URL (Ghi đè nếu không upload)</Label>
                <Input name="logo_url" value={(editingItem as Sponsor).logo_url} onChange={handleInputChange} placeholder="URL Logo" className="bg-gray-700 border-gray-600 text-white" />
              </>
            )}

            {editingType === 'faq' && editingItem && (
              <>
                <Label className='text-gray-300'>Câu hỏi</Label>
                <Input name="question" value={(editingItem as FAQ).question} onChange={handleInputChange} placeholder="Câu hỏi thường gặp" className="bg-gray-700 border-gray-600 text-white" />
                <Label className='text-gray-300'>Trả lời</Label>
                <Textarea name="answer" value={(editingItem as FAQ).answer} onChange={handleInputChange} placeholder="Câu trả lời" rows={4} className="bg-gray-700 border-gray-600 text-white" />
              </>
            )}

            {editingType === 'field' && editingItem && (
              <>
                <div className="space-y-2">
                    <Label htmlFor="field-label" className='text-gray-300'>Nhãn hiển thị</Label>
                    <Input name="label" id="field-label" value={(editingItem as FormField).label} onChange={handleInputChange} placeholder="Họ và tên" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="field-name" className='text-gray-300'>Tên trường (Tự động tạo)</Label>
                    <Input name="name" id="field-name" value={(editingItem as FormField).name} readOnly placeholder="full_name" className="bg-gray-700 border-gray-600 text-gray-400" />
                </div>
                <div className="space-y-2">
                    <Label className='text-gray-300'>Loại trường</Label>
                    <Select name="type" value={(editingItem as FormField).type} onValueChange={(v) => handleInputChange({ target: { name: 'type', value: v } } as any)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-gray-800">
                            <SelectItem value="text">Text (Văn bản)</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="tel">Phone (Số ĐT)</SelectItem>
                            <SelectItem value="number">Number (Số)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="required" name="required" checked={(editingItem as FormField).required} onCheckedChange={(c) => handleCheckboxChange('required', c as boolean)} className='border-gray-600 data-[state=checked]:bg-blue-600' />
                    <Label htmlFor="required">Là trường bắt buộc?</Label>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white">Hủy</Button>
            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90 text-white">{loading ? 'Đang lưu...' : 'Lưu'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
