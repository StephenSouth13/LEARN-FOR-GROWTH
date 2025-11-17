'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Users, FileText, Settings, LogOut, Download, Trash2, Plus, Upload, Globe } from 'lucide-react'

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

const defaultSpeakers: Speaker[] = [
  {
    id: '1',
    name: 'Đoàn Đức Minh',
    title: 'Phó Trưởng khoa Du lịch - UEH',
    image: '/doan-duc-minh.png',
    bio: ' Phó Trưởng khoa Du lịch – Đại học Kinh tế TP. Hồ Chí Minh (UEH)\nThạc sĩ Quản trị Kinh doanh, nghiên cứu sinh Tiến sĩ Quản trị Kinh doanh\nGiảng viên Khoa Du lịch – Đại học Kinh tế TP. Hồ Chí Minh (UEH)\nNhiều năm kinh nghiệm làm việc tại các tập đoàn trong và ngoài nước (từ nhân viên đến lãnh đạo cấp cao)'
  },
  {
    id: '2',
    name: 'Phan Huỳnh Anh',
    title: 'Tiến sĩ, Kinh tế',
    image: '/phan-quynh-anh.png',
    bio: 'Giảng viên tại UEH, nhà doanh nhân và mentor khởi nghiệp uy tín, với niềm đam mê sâu sắc trong giáo dục thực hành và mentoring doanh nghiệp\nĐồng sáng lập Quỹ FFVN\nThành lập Viện Smentor – mô hình đào tạo, mentoring cho startup & doanh nghiệp\nĐồng sáng lập Viện Việt Nam Bách Nghệ Thực Hành và các mô hình kinh doanh – công nghệ'
  },
  {
    id: '3',
    name: 'Phạm Hoàng Minh Khánh',
    title: 'CEO Công ty cổ phần SMAR',
    image: '/pham-hoang-minh-khanh.png',
    bio: 'Sáng lập & Giám đốc Công ty TNHH Smentor (2017 – nay)\nSáng lập & Giám đốc Công ty cổ phần SMAR (2020 – nay)\nSáng lập & Giám đốc Công ty Phát triển Nông nghiệp Xanh SGA (2022 – nay)\nViện Phó – Viện Việt Nam Bách Nghệ Thực Hành (2021 – nay)\nGiảng viên – Đại học Kinh tế Tài chính TP.HCM (UEF) (2022 – nay)'
  },
  {
    id: '4',
    name: 'Đỗ Phan Nam Tiến',
    title: 'Giám đốc, Trung tâm Phát triển Kỹ năng Tự sự',
    image: '/do-phan-nam-tien.png',
    bio: 'Có nhiều năm đảm nhiệm vị trí Giám đốc Pháp lý tại các doanh nghiệp trong nước và có vốn đầu tư nước ngoài, sở hữu nền tảng chuyên môn vững chắc trong lĩnh vực pháp lý doanh nghiệp, quản trị và kiểm soát nội bộ. Hiện nay, ông là Giám đốc Trung tâm Phát triển Kinh tế S17, đồng thời là chuyên gia uy tín có nhiều đóng góp tích cực cho Cộng đồng khởi nghiệp và đổi mới sáng tạo tại TP. Hồ Chí Minh. Với kinh nghiệm thực tiễn phong phú và tâm huyết trong việc phát triển hệ sinh thái khởi nghiệp, ông được biết đến là một trong những gương mặt tiêu biểu trong lĩnh vực quản trị và hỗ trợ doanh nghiệp đổi mới sáng tạo.'
  },
  {
    id: '5',
    name: 'Dương Thế Khải',
    title: 'Chủ tịch Vietnam Student Marathon',
    image: '/duong-the-khai.png',
    bio: 'Chủ tịch Vietnam Student Marathon\n6 lần chinh phục cự ly Full Marathon (42,195 km)\nQuản lý dự án tại Công ty CP Tập đoàn Nam Quốc\nTrợ lý Giám đốc tại Công ty TNHH F FOUNDATION\nQuản lý dự án tại Công ty phát triển Nông Nghiệp Xanh SGA'
  },
  {
    id: '6',
    name: 'Nguyễn Trang',
    title: 'MC/Host',
    image: '/nguyen-trang.png',
    bio: 'MC Nguyễn Trang là một gương mặt nổi bật, đã xuất sắc giành ngôi vị Tân quán quân Your Voice Our Voice 2025 và danh hiệu Miss MC duyên dáng. Không chỉ khẳng định tài năng trong lĩnh vực dẫn dắt, cô còn gặt hái thành công tại các cuộc thi nhan sắc với thành tích Á khôi Đại sứ Văn hóa ASEAN, lọt Top 10 Hoa Hậu Văn Hóa Hữu Nghị Quốc Tế và vinh dự nhận giải Người đẹp truyền cảm hứng, chứng minh cho sự duyên dáng, tài năng và khả năng lan tỏa những giá trị tích cực đến cộng đồng.'
  },
]

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>(defaultSpeakers) 
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [adminPassword] = useState(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123')
  const [bannerImageUrl, setBannerImageUrl] = useState('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BANNER-02-IKGWPZBdjlezN3kNhOOa7zhHxNaBtE.png')
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', name: 'fullName', label: 'Họ và tên', type: 'text', required: true, placeholder: 'Nhập họ và tên' },
    { id: '2', name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
    { id: '3', name: 'phone', label: 'Số điện thoại', type: 'tel', required: true, placeholder: '0123 456 789' },
    { id: '4', name: 'organization', label: 'Công ty / Tổ chức', type: 'text', required: false, placeholder: 'Tên công ty' },
  ])
  const [editingField, setEditingField] = useState<FormField | null>(null)
  
  useEffect(() => {
    const stored = localStorage.getItem('seminar_registrations')
    if (stored) {
      setRegistrations(JSON.parse(stored))
    }


    const storedSponsors = localStorage.getItem('seminar_sponsors')
    if (storedSponsors) {
      setSponsors(JSON.parse(storedSponsors))
    } else {
      const defaultSponsors: Sponsor[] = [
        { id: '1', name: 'UEH University', type: 'Tổ chức chính' },
        { id: '2', name: 'School of Tourism', type: 'Đơn vị đồng hành' },
        { id: '3', name: 'SIT', type: 'Tài trợ' },
        { id: '4', name: 'Smentor', type: 'Tài trợ' },
        { id: '5', name: 'DMAR', type: 'Tài trợ' },
        { id: '6', name: 'MSC Center', type: 'Tài trợ' },
      ]
      setSponsors(defaultSponsors)
      localStorage.setItem('seminar_sponsors', JSON.stringify(defaultSponsors))
    }

    const storedFaqs = localStorage.getItem('seminar_faqs')
    if (storedFaqs) {
      setFaqs(JSON.parse(storedFaqs))
    } else {
      const defaultFaqs: FAQ[] = [
        {
          id: '1',
          question: 'Buổi hội thảo này có phí tham gia không?',
          answer: 'Không, buổi hội thảo này hoàn toàn miễn phí. Chúng tôi cam kết mang đến trải nghiệm học hỏi tuyệt vời cho tất cả các bạn sinh viên.',
        },
        {
          id: '2',
          question: 'Tôi có cần đóng góp gì khác không?',
          answer: 'Chỉ cần điều chỉnh thời gian của bạn để tham dự sự kiện. Nếu bạn có những ý tưởng hoặc câu hỏi cụ thể, vui lòng liên hệ với chúng tôi.',
        },
        {
          id: '3',
          question: 'Buổi hội thảo kéo dài bao lâu?',
          answer: 'Buổi hội thảo diễn ra từ 17:30 đến 21:00 (3 giờ 30 phút).',
        },
        {
          id: '4',
          question: 'Nếu tôi không thể tham dự, tôi có thể hủy đăng ký không?',
          answer: 'Vâng, bạn có thể hủy đăng ký bất cứ lúc nào bằng cách liên hệ với chúng tôi.',
        },
        {
          id: '5',
          question: 'Có chỗ ăn nhẹ và đồ uống tại sự kiện không?',
          answer: 'Có, chúng tôi sẽ cung cấp đồ uống và các món ăn nhẹ miễn phí cho tất cả những người tham dự.',
        },
      ]
      setFaqs(defaultFaqs)
      localStorage.setItem('seminar_faqs', JSON.stringify(defaultFaqs))
    }

    const storedBanner = localStorage.getItem('seminar_banner')
    if (storedBanner) {
      setBannerImageUrl(storedBanner)
    }

    const storedFields = localStorage.getItem('seminar_form_fields')
    if (storedFields) {
      setFormFields(JSON.parse(storedFields))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Mật khẩu không chính xác')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        if (type === 'speaker' && editingSpeaker) {
          setEditingSpeaker({ ...editingSpeaker, image: base64 })
        } else if (type === 'banner') {
          setBannerImageUrl(base64)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadRegistrations = () => {
    const csv = [
      ['Họ tên', 'Email', 'Số điện thoại', 'Công ty', 'Thời gian đăng ký'],
      ...registrations.map(r => [r.fullName, r.email, r.phone, r.organization, r.registeredAt])
    ]
    const csvContent = csv.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations_${new Date().toISOString()}.csv`
    a.click()
  }

  const saveSpeakers = () => {
    alert('Lưu diễn giả thành công! (Danh sách chỉ được cập nhật trong phiên hiện tại)')
  }

  const updateSpeaker = (updatedSpeaker: Speaker) => {
    setSpeakers(speakers.map(s => s.id === updatedSpeaker.id ? updatedSpeaker : s))
    setEditingSpeaker(null)
  }

  const deleteSpeaker = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa diễn giả này?')) {
      setSpeakers(speakers.filter(s => s.id !== id))
    }
  }

  const addSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: 'Tên diễn giả',
      title: 'Chức vụ',
      image: '/placeholder.svg',
      bio: 'Tiểu sử'
    }
    setSpeakers([...speakers, newSpeaker])
  }

  const addSponsor = () => {
    const newSponsor: Sponsor = {
      id: Date.now().toString(),
      name: 'Tên đơn vị',
      type: 'Loại hỗ trợ'
    }
    setSponsors([...sponsors, newSponsor])
  }

  const updateSponsor = (updatedSponsor: Sponsor) => {
    setSponsors(sponsors.map(s => s.id === updatedSponsor.id ? updatedSponsor : s))
    setEditingSponsor(null)
  }

  const deleteSponsor = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa đơn vị này?')) {
      setSponsors(sponsors.filter(s => s.id !== id))
    }
  }

  const addFaq = () => {
    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: 'Câu hỏi',
      answer: 'Trả lời'
    }
    setFaqs([...faqs, newFaq])
  }

  const updateFaq = (updatedFaq: FAQ) => {
    setFaqs(faqs.map(f => f.id === updatedFaq.id ? updatedFaq : f))
    setEditingFaq(null)
  }

  const deleteFaq = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa câu hỏi này?')) {
      setFaqs(faqs.filter(f => f.id !== id))
    }
  }

  const saveFaqs = () => {
    localStorage.setItem('seminar_faqs', JSON.stringify(faqs))
    alert('Lưu câu hỏi thành công!')
  }

  const saveBannerUrl = () => {
    localStorage.setItem('seminar_banner', bannerImageUrl)
    alert('Cập nhật ảnh bìa thành công!')
  }

  const addFormField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      name: 'field_' + Date.now(),
      label: 'Trường mới',
      type: 'text',
      required: false,
      placeholder: 'Nhập thông tin'
    }
    setFormFields([...formFields, newField])
  }

  const updateFormField = (updatedField: FormField) => {
    setFormFields(formFields.map(f => f.id === updatedField.id ? updatedField : f))
    setEditingField(null)
  }

  const deleteFormField = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa trường này?')) {
      setFormFields(formFields.filter(f => f.id !== id))
    }
  }

  const saveFormFields = () => {
    localStorage.setItem('seminar_form_fields', JSON.stringify(formFields))
    alert('Lưu cấu hình form thành công!')
  }

  const saveSponsors = () => {
    localStorage.setItem('seminar_sponsors', JSON.stringify(sponsors))
    alert('Lưu đơn vị hỗ trợ thành công!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-slate-800 border-accent/20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white text-center">Admin Dashboard</h1>
            <p className="text-muted-foreground text-center text-sm mt-2">LEARN FOR GROWTH 2025</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Mật khẩu Admin</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Đăng nhập
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Mật khẩu mặc định: admin123
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-foreground">
      <nav className="bg-slate-800 border-b border-accent/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-sm text-muted-foreground">LEARN FOR GROWTH 2025</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut size={16} />
            Đăng xuất
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList className="bg-slate-800 border border-accent/20">
            <TabsTrigger value="registrations" className="gap-2">
              <Users size={16} />
              Đăng ký
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText size={16} />
              Nội dung
            </TabsTrigger>
            <TabsTrigger value="register-fields" className="gap-2">
              <FileText size={16} />
              Form Đăng ký
            </TabsTrigger>
            <TabsTrigger value="speakers" className="gap-2">
              <Users size={16} />
              Diễn giả
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="gap-2">
              <FileText size={16} />
              Đơn vị hỗ trợ
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <FileText size={16} />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="i18n" className="gap-2">
              <Globe size={16} />
              Ngôn ngữ
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 size={16} />
              Thống kê
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Danh sách đăng ký ({registrations.length})</h2>
              <Button onClick={downloadRegistrations} className="gap-2 bg-accent hover:bg-accent/90">
                <Download size={16} />
                Tải xuống CSV
              </Button>
            </div>

            <Card className="bg-slate-800 border-accent/20 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700 border-b border-accent/20">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Họ tên</th>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Số ĐT</th>
                    <th className="px-6 py-3 text-left font-semibold">Công ty</th>
                    <th className="px-6 py-3 text-left font-semibold">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        Chưa có đăng ký
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-700/50 transition">
                        <td className="px-6 py-4">{reg.fullName}</td>
                        <td className="px-6 py-4">{reg.email}</td>
                        <td className="px-6 py-4">{reg.phone}</td>
                        <td className="px-6 py-4">{reg.organization || '-'}</td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">{reg.registeredAt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold">Quản lý Ảnh bìa</h2>
            
            <Card className="bg-slate-800 border-accent/20 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Upload ảnh bìa từ máy</label>
                <div className="mb-4 flex gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  />
                </div>
                
                <label className="block text-sm font-medium mb-2">Hoặc nhập URL ảnh bìa</label>
                <Input
                  type="text"
                  placeholder="https://example.com/banner.jpg"
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mb-4"
                />
                <div className="mb-4">
                  <img src={bannerImageUrl || "/placeholder.svg"} alt="Banner preview" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <Button onClick={saveBannerUrl} className="w-full bg-accent hover:bg-accent/90">
                  Cập nhật ảnh bìa
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="register-fields" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý Trường Form Đăng ký ({formFields.length})</h2>
              <Button onClick={addFormField} className="gap-2 bg-accent hover:bg-accent/90">
                <Plus size={16} />
                Thêm trường
              </Button>
            </div>

            <div className="space-y-4">
              {formFields.map((field) => (
                <Card key={field.id} className="bg-slate-800 border-accent/20 p-6">
                  {editingField?.id === field.id ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Tên trường</label>
                          <Input
                            type="text"
                            value={editingField.name}
                            onChange={(e) => setEditingField({...editingField, name: e.target.value})}
                            className="bg-slate-700 border-slate-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nhãn hiển thị</label>
                          <Input
                            type="text"
                            value={editingField.label}
                            onChange={(e) => setEditingField({...editingField, label: e.target.value})}
                            className="bg-slate-700 border-slate-600"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Loại trường</label>
                          <select
                            value={editingField.type}
                            onChange={(e) => setEditingField({...editingField, type: e.target.value as any})}
                            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Số điện thoại</option>
                            <option value="number">Số</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Placeholder</label>
                          <Input
                            type="text"
                            value={editingField.placeholder}
                            onChange={(e) => setEditingField({...editingField, placeholder: e.target.value})}
                            className="bg-slate-700 border-slate-600"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingField.required}
                            onChange={(e) => setEditingField({...editingField, required: e.target.checked})}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium">Bắt buộc</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => updateFormField(editingField)} className="flex-1 bg-accent hover:bg-accent/90">
                          Lưu
                        </Button>
                        <Button onClick={() => setEditingField(null)} variant="outline" className="flex-1">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{field.label}</h3>
                        <p className="text-xs text-muted-foreground">Tên: {field.name} | Loại: {field.type} | {field.required ? 'Bắt buộc' : 'Tùy chọn'}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingField(field)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Chỉnh sửa
                        </Button>
                        <Button onClick={() => deleteFormField(field.id)} variant="destructive" className="flex-1">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <Button onClick={saveFormFields} className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
              Lưu cấu hình form
            </Button>
          </TabsContent>

          <TabsContent value="speakers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý Diễn giả ({speakers.length})</h2>
              <Button onClick={addSpeaker} className="gap-2 bg-accent hover:bg-accent/90">
                <Plus size={16} />
                Thêm diễn giả
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {speakers.map((speaker) => (
                <Card key={speaker.id} className="bg-slate-800 border-accent/20 p-6">
                  {editingSpeaker?.id === speaker.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Tên</label>
                        <Input
                          type="text"
                          value={editingSpeaker.name}
                          onChange={(e) => setEditingSpeaker({...editingSpeaker, name: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Chức vụ</label>
                        <Input
                          type="text"
                          value={editingSpeaker.title}
                          onChange={(e) => setEditingSpeaker({...editingSpeaker, title: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload ảnh đại diện từ máy</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'speaker')}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white mb-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Hoặc nhập URL ảnh</label>
                        <Input
                          type="text"
                          value={editingSpeaker.image}
                          onChange={(e) => setEditingSpeaker({...editingSpeaker, image: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tiểu sử</label>
                        <Input
                          type="text"
                          value={editingSpeaker.bio}
                          onChange={(e) => setEditingSpeaker({...editingSpeaker, bio: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => updateSpeaker(editingSpeaker)} className="flex-1 bg-accent hover:bg-accent/90">
                          Lưu
                        </Button>
                        <Button onClick={() => setEditingSpeaker(null)} variant="outline" className="flex-1">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} className="w-full h-40 object-cover rounded-lg" />
                      <div>
                        <h3 className="font-semibold text-lg">{speaker.name}</h3>
                        <p className="text-sm text-accent mb-2">{speaker.title}</p>
                        <p className="text-xs text-muted-foreground whitespace-pre-line">{speaker.bio}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingSpeaker(speaker)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Chỉnh sửa
                        </Button>
                        <Button onClick={() => deleteSpeaker(speaker.id)} variant="destructive" className="flex-1">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <Button onClick={saveSpeakers} className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
              Lưu tất cả diễn giả
            </Button>
          </TabsContent>

          <TabsContent value="sponsors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý Đơn vị hỗ trợ ({sponsors.length})</h2>
              <Button onClick={addSponsor} className="gap-2 bg-accent hover:bg-accent/90">
                <Plus size={16} />
                Thêm đơn vị
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.id} className="bg-slate-800 border-accent/20 p-6">
                  {editingSponsor?.id === sponsor.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Tên đơn vị</label>
                        <Input
                          type="text"
                          value={editingSponsor.name}
                          onChange={(e) => setEditingSponsor({...editingSponsor, name: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Loại hỗ trợ</label>
                        <Input
                          type="text"
                          value={editingSponsor.type}
                          onChange={(e) => setEditingSponsor({...editingSponsor, type: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                          placeholder="VD: Tài trợ, Đơn vị đồng hành, Tổ chức chính"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => updateSponsor(editingSponsor)} className="flex-1 bg-accent hover:bg-accent/90">
                          Lưu
                        </Button>
                        <Button onClick={() => setEditingSponsor(null)} variant="outline" className="flex-1">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{sponsor.name}</h3>
                      <p className="text-sm text-accent">{sponsor.type}</p>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingSponsor(sponsor)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Chỉnh sửa
                        </Button>
                        <Button onClick={() => deleteSponsor(sponsor.id)} variant="destructive" className="flex-1">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <Button onClick={saveSponsors} className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
              Lưu tất cả đơn vị hỗ trợ
            </Button>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý Câu hỏi thường gặp ({faqs.length})</h2>
              <Button onClick={addFaq} className="gap-2 bg-accent hover:bg-accent/90">
                <Plus size={16} />
                Thêm câu hỏi
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="bg-slate-800 border-accent/20 p-6">
                  {editingFaq?.id === faq.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Câu hỏi</label>
                        <Input
                          type="text"
                          value={editingFaq.question}
                          onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Trả lời</label>
                        <textarea
                          value={editingFaq.answer}
                          onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => updateFaq(editingFaq)} className="flex-1 bg-accent hover:bg-accent/90">
                          Lưu
                        </Button>
                        <Button onClick={() => setEditingFaq(null)} variant="outline" className="flex-1">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingFaq(faq)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Chỉnh sửa
                        </Button>
                        <Button onClick={() => deleteFaq(faq.id)} variant="destructive" className="flex-1">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <Button onClick={saveFaqs} className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
              Lưu tất cả câu hỏi
            </Button>
          </TabsContent>

          <TabsContent value="i18n" className="space-y-6">
            <h2 className="text-2xl font-bold">Quản lý Ngôn ngữ</h2>
            
            <Card className="bg-slate-800 border-accent/20 p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Hỗ trợ ngôn ngữ</h3>
                <p className="text-muted-foreground mb-4">
                  Website hiện hỗ trợ 2 ngôn ngữ:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700 rounded-lg border border-accent/20">
                    <h4 className="font-semibold">Tiếng Việt (VI)</h4>
                    <p className="text-sm text-muted-foreground">Ngôn ngữ mặc định</p>
                  </div>
                  <div className="p-4 bg-slate-700 rounded-lg border border-accent/20">
                    <h4 className="font-semibold">English (EN)</h4>
                    <p className="text-sm text-muted-foreground">Ngôn ngữ phụ</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-600">
                <h3 className="font-semibold text-lg mb-4">Hướng dẫn thêm ngôn ngữ mới</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>1. Mở file: <code className="bg-slate-700 px-2 py-1 rounded">lib/i18n.ts</code></p>
                  <p>2. Thêm ngôn ngữ mới trong object translations</p>
                  <p>3. Cập nhật type Language = 'vi' | 'en' | 'ja' (ví dụ)</p>
                  <p>4. Kiểm tra các component sử dụng useLanguage() và translations</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Thống kê</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-accent/20 p-6">
                <p className="text-muted-foreground text-sm mb-2">Tổng đăng ký</p>
                <p className="text-4xl font-bold text-accent">{registrations.length}</p>
              </Card>
              
              <Card className="bg-slate-800 border-accent/20 p-6">
                <p className="text-muted-foreground text-sm mb-2">Ngày hôm nay</p>
                <p className="text-4xl font-bold text-accent">
                  {registrations.filter(r => {
                    const regDate = new Date(r.registeredAt).toDateString()
                    const today = new Date().toDateString()
                    return regDate === today
                  }).length}
                </p>
              </Card>

              <Card className="bg-slate-800 border-accent/20 p-6">
                <p className="text-muted-foreground text-sm mb-2">Công ty</p>
                <p className="text-4xl font-bold text-accent">
                  {new Set(registrations.map(r => r.organization)).size}
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
