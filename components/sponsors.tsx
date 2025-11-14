'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Sponsor {
  id: string
  name: string
  type: string
}

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('seminar_sponsors')
    if (stored) {
      setSponsors(JSON.parse(stored))
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-background dark:from-slate-950 to-primary/5 dark:to-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Đơn vị <span className="text-accent">hỗ trợ</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">
          Các đơn vị trao tặng hỗ trợ sự kiện thành công
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <Card
              key={sponsor.id}
              className="p-6 bg-card dark:bg-slate-900 border-accent/10 hover:border-accent/30 transition text-center hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="h-20 flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 dark:from-accent/30 to-primary/20 dark:to-primary/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-accent text-center px-2">{sponsor.name}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{sponsor.type}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
