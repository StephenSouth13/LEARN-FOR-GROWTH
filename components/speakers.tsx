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
      setSpeakers(defaultSpeakers)
    }
  }, [])

  return (
    <section id="speakers" className="py-20 bg-background dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Diễn <span className="text-accent">giả</span>
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
