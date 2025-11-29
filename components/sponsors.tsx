'use client'

import { Card } from '@/components/ui/card'

// Cập nhật interface để khớp với tên cột trong Supabase
interface Sponsor {
  id: string
  name: string
  type: string // Loại hỗ trợ (Tổ chức chính, Tài trợ,...)
  logo_url: string // URL của logo
  website: string // Website của đơn vị
}

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  // Nhóm các sponsors theo loại hỗ trợ (type)
  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    const type = sponsor.type || 'Khác';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  // Thứ tự hiển thị ưu tiên
  const order = ['Tổ chức chính', 'Đơn vị đồng hành', 'Tài trợ', 'Khác'];

  return (
    <section className="py-20 bg-gradient-to-b from-background dark:from-slate-950 to-primary/5 dark:to-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Đơn vị <span className="text-accent">hỗ trợ</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">
          Các đơn vị đã hỗ trợ sự kiện thành công.
        </p>

        {/* Hiển thị theo nhóm */}
        {order.map((type) => {
          const group = groupedSponsors[type];
          if (!group || group.length === 0) return null;

          return (
            <div key={type} className="mb-12">
              <h3 className="text-2xl font-semibold text-center text-accent mb-8 border-b-2 border-accent/20 pb-2">
                {type}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {group.map((sponsor) => (
                  <Card
                    key={sponsor.id}
                    className="p-6 bg-card dark:bg-slate-900 border-accent/10 hover:border-accent/30 transition text-center hover:shadow-lg hover:shadow-accent/10 w-full max-w-xs flex flex-col items-center justify-between"
                  >
                    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <div className="h-20 w-full flex items-center justify-center mb-4">
                        {sponsor.logo_url ? (
                          <img 
                            src={sponsor.logo_url} 
                            alt={sponsor.name} 
                            className="max-h-full max-w-full object-contain" 
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-gradient-to-br from-accent/20 dark:from-accent/30 to-primary/20 dark:to-primary/30 flex items-center justify-center">
                            <span className="text-sm font-semibold text-accent text-center px-2">{sponsor.name}</span>
                          </div>
                        )}
                      </div>
                    </a>
                    <p className="text-lg font-bold mt-2">{sponsor.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}