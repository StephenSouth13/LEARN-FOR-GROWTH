'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface Speaker {
  id: string
  name: string
  title: string
  image: string
  bio: string
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('seminar_speakers')
    if (stored) {
      setSpeakers(JSON.parse(stored))
    } else {
      // Fallback to default speakers
      const defaultSpeakers: Speaker[] = [
        {
          id: '1',
          name: 'Đoàn Đức Minh',
          title: 'Phó Trưởng khoa Du lịch - UEH',
          image: '/professional-man-glasses.jpg',
          bio: 'Chuyên gia giáo dục du lịch với hơn 15 năm kinh nghiệm'
        },
        {
          id: '2',
          name: 'Phan Huyền Anh',
          title: 'Tiến sĩ, Kinh tế',
          image: '/professional-man-business.jpg',
          bio: 'Nghiên cứu viên hàng đầu trong lĩnh vực kinh tế doanh nghiệp'
        },
        {
          id: '3',
          name: 'Phạm Hoàng Minh Khánh',
          title: 'CEO Công ty cổ phần SMAR',
          image: '/professional-woman-smile.jpg',
          bio: 'Doanh nhân và nhà lãnh đạo với thành tích điều hành công ty'
        },
        {
          id: '4',
          name: 'Đỗ Phan Nam Tiến',
          title: 'Giám đốc, Trung tâm Phát triển Kỹ năng Tự sự',
          image: '/professional-man-formal.jpg',
          bio: 'Chuyên gia phát triển kỹ năng và huấn luyện doanh nghiệp'
        },
        {
          id: '5',
          name: 'Dương Thế Khai',
          title: 'Chủ tịch Vietnam Student Marathon',
          image: '/professional-man-casual.jpg',
          bio: 'Nhà tổ chức sự kiện và lãnh đạo cộng đồng sinh viên'
        },
      ]
      setSpeakers(defaultSpeakers)
    }
  }, [])

  return (
    <section id="speakers" className="py-20 bg-background dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Diễn <span className="text-accent">giảPASSWORD</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Gặp gỡ các chuyên gia hàng đầu trong lĩnh vực kinh doanh và phát triển nhân sự
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <Card
              key={speaker.id}
              className="overflow-hidden bg-card dark:bg-slate-900 border-accent/20 hover:border-accent/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-80">
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg'
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{speaker.name}</h3>
                <p className="text-sm text-accent font-medium mb-3">{speaker.title}</p>
                <p className="text-xs text-muted-foreground">{speaker.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
