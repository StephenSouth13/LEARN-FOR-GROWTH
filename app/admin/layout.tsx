import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - LEARN FOR GROWTH",
  description: "Manage event registrations and content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
