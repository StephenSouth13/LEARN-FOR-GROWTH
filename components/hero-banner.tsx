'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface HeroBannerProps {
  bannerImageUrl: string;
}

export default function HeroBanner({ bannerImageUrl }: HeroBannerProps) {
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full overflow-hidden pt-1">
      <div className="relative w-full aspect-video md:aspect-auto md:min-h-screen">
        <Image
          src={bannerImageUrl}
          alt="LEARN FOR GROWTH Seminar 2025"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/banner-02.png'; // Fallback image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* <div className="absolute bottom-8 md:bottom-12 left-4 sm:left-8 lg:left-16 flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => scrollToElement('register')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg"
          >
            Đăng ký ngay
          </Button>
          <Button 
            onClick={() => scrollToElement('event')}
            variant="outline" 
            className="mb-[25px] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg text-white border-2 border-white hover:bg-white/20 font-bold transition-all duration-300 backdrop-blur-sm rounded-lg"
          >
            Xem chi tiết
          </Button>
        </div> */}

        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 animate-bounce">
          <ChevronDown className="text-white" size={28} />
        </div>
      </div>
    </section>
  )
}
