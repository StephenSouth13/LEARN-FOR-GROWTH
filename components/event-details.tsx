import { Calendar, Clock, MapPin, Phone, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function EventDetails() {
  return (
    <section id="event" className="py-20 bg-background dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Thông <span className="text-accent">tin</span> sự <span className="text-accent">kiện</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card dark:bg-slate-900 border-accent/20 hover:border-accent/50 transition">
            <div className="flex gap-4 mb-4">
              <Calendar className="text-accent flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-lg mb-2">Ngày và Giờ</h3>
                <p className="text-muted-foreground">Thứ hai, 24 tháng 11 năm 2025</p>
                <p className="text-muted-foreground">17:30 - 21:00</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card dark:bg-slate-900 border-accent/20 hover:border-accent/50 transition">
            <div className="flex gap-4">
              <MapPin className="text-accent flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-lg mb-2">Địa điểm</h3>
                <p className="text-muted-foreground">Đại học Kinh tế TP.HCM - Cơ sở B</p>
                <p className="text-muted-foreground">279 Nguyễn Tri Phương, Phường Điện Hồng</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/5 dark:from-primary/10 to-accent/5 dark:to-accent/10 border-accent/20">
          <h3 className="text-2xl font-bold mb-6">Giới thiệu sự kiện</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Sự kiện "LEARN FOR GROWTH - KỸ NĂNG LÀM VIỆC CHUYÊN NGHIỆP TRONG MÔI TRƯỜNG DOANH NGHIỆP" 
              là một buổi hội thảo toàn diện dành cho sinh viên và những người tìm kiếm phát triển kỹ năng chuyên nghiệp.
            </p>
            <p>
              Các diễn giả hàng đầu sẽ chia sẻ kinh nghiệm và chiến lược thành công trong môi trường kinh doanh hiện đại. 
              Đây là cơ hội tuyệt vời để mở rộng mạng lưới, học hỏi từ các chuyên gia, và phát triển sự nghiệp của bạn.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-start gap-3">
            <Phone className="text-accent flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Hotline</p>
              <p className="text-foreground">0397 588 756</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-accent flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Địa chỉ</p>
              <p className="text-foreground">279 Nguyễn Tri Phương</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="text-accent flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Website</p>
              <p className="text-foreground">learnforgrowth.vn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
