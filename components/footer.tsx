'use client'

import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background dark:from-slate-950 to-primary/10 dark:to-slate-900/50 border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-07.png"
                alt="LEARN FOR GROWTH logo"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Phát triển kỹ năng chuyên nghiệp cho thế hệ lãnh đạo tương lai.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#event" className="text-muted-foreground hover:text-foreground transition">Sự kiện</a></li>
              <li><a href="#speakers" className="text-muted-foreground hover:text-foreground transition">Diễn giả</a></li>
              <li><a href="#register" className="text-muted-foreground hover:text-foreground transition">Đăng ký</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition">FAQ</a></li>
              <li><a href="/admin" className="text-muted-foreground hover:text-foreground transition">Admin</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">0397 588 756</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">contact@learnforgrowth.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">279 Nguyễn Tri Phương, TP.HCM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Website</h3>
            <p className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
              learnforgrowth.vn
            </p>
          </div>
        </div>

        <div className="border-t border-accent/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 LEARN FOR GROWTH. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
