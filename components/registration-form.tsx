'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/i18n'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
interface FormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number'
  required: boolean
  placeholder: string
}

interface RegistrationFormProps {
  formFields: FormField[];
}

export default function RegistrationForm({ formFields }: RegistrationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initialFormData = formFields.reduce((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {} as Record<string, string>)

  const [formData, setFormData] = useState<Record<string, string>>(initialFormData)
  const { language } = useLanguage()
  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const supabase = getSupabaseBrowser()

    // Ánh xạ tên trường từ camelCase (frontend) sang snake_case (database)
    const registrationData: { [key: string]: any } = {}
    for (const key in formData) {
      const snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      registrationData[snakeCaseKey] = formData[key];
    }

    const { error } = await supabase.from('registrations').insert([registrationData])

    setIsSubmitting(false)

    if (error) {
      setError(`Đăng ký thất bại: ${error.message}. Vui lòng thử lại.`)
      console.error('Lỗi đăng ký Supabase:', error)
    } else {
      setIsSubmitted(true)
      setFormData(initialFormData) // Đặt lại form
      setTimeout(() => setIsSubmitted(false), 5000)
    }
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
            {formFields && formFields.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <div key={field.id || index} className={formFields.length % 2 !== 0 && index === formFields.length - 1 ? 'md:col-span-2' : ''}>
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
                      disabled={isSubmitting}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Form đăng ký hiện không có sẵn. Vui lòng quay lại sau.</p>
            )}

            {formFields && formFields.length > 0 && (
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : t.register.submit}
              </Button>
            )}

            {isSubmitted && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-fade-in">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="text-green-700 dark:text-green-400 font-semibold">{t.register.success_title}</p>
                  <p className="text-sm text-green-600 dark:text-green-500">{t.register.success_message}</p>
                </div>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertTriangle className="text-red-500" size={20} />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </form>
        </Card>
      </div>
    </section>
  )
}
