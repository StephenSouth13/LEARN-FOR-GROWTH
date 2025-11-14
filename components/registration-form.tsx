'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/i18n'

interface FormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number'
  required: boolean
  placeholder: string
}

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', name: 'fullName', label: 'Họ và tên', type: 'text', required: true, placeholder: 'Nhập họ và tên' },
    { id: '2', name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
    { id: '3', name: 'phone', label: 'Số điện thoại', type: 'tel', required: true, placeholder: '0123 456 789' },
    { id: '4', name: 'organization', label: 'Công ty / Tổ chức', type: 'text', required: false, placeholder: 'Tên công ty' },
  ])
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
  })
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Load custom form fields from localStorage
    const storedFields = localStorage.getItem('seminar_form_fields')
    if (storedFields) {
      setFormFields(JSON.parse(storedFields))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const registration = {
      id: Date.now().toString(),
      ...formData,
      registeredAt: new Date().toISOString(),
    }

    const stored = JSON.parse(localStorage.getItem('seminar_registrations') || '[]')
    stored.push(registration)
    localStorage.setItem('seminar_registrations', JSON.stringify(stored))

    setIsSubmitted(true)
    const emptyData: Record<string, string> = {}
    formFields.forEach(field => {
      emptyData[field.name] = ''
    })
    setFormData(emptyData)
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-background via-primary/5 to-background dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          {language === 'vi' ? 'Đăng' : 'Register'} <span className="text-accent">{language === 'vi' ? 'ký' : 'Now'}</span> {language === 'en' && 'to Join'}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t.register.subtitle}
        </p>

        <Card className="p-8 md:p-12 bg-card dark:bg-slate-900 border-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div key={field.id} className={field.id === '4' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label} {field.required ? '*' : ''}
                  </label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="bg-background/50 dark:bg-slate-800 border-accent/20 focus:border-accent"
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              size="lg"
            >
              {t.register.submit}
            </Button>

            {isSubmitted && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-fade-in">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="text-green-700 font-semibold">{t.register.success_title}</p>
                  <p className="text-sm text-green-600">{t.register.success_message}</p>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </section>
  )
}
