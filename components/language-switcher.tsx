'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'vi' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('vi')}
        className={language === 'vi' ? 'bg-accent hover:bg-accent/90' : ''}
      >
        VI
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-accent hover:bg-accent/90' : ''}
      >
        EN
      </Button>
    </div>
  )
}
