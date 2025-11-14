import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LEARN FOR GROWTH 2025 - Seminar Kỹ Năng Chuyên Nghiệp',
  description: 'Tham gia hội thảo "LEARN FOR GROWTH" ngày 24/11/2025. Học kỹ năng làm việc chuyên nghiệp từ các chuyên gia hàng đầu tại Đại học Kinh tế TP.HCM.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
    generator: 'quachthanhlong'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
