# LEARN FOR GROWTH 2025 - Event Landing Page

Một trang web sự kiện chuyên nghiệp được xây dựng bằng **Next.js 16 + React 19** với đầy đủ tính năng quản lý sự kiện.

## ✨ Tính năng

- 🎨 **Thiết kế đẹp & hiện đại** - Teal gradient + orange accents
- 🌙 **Dark Mode** - Hỗ trợ tối/sáng và tự động theo hệ điều hành
- 📱 **Responsive** - Mobile-first design, tương thích mọi thiết bị
- 🖼️ **Hero Banner** - Ảnh banner đẹp với thông tin sự kiện
- 👥 **Speakers Grid** - Hiển thị diễn giả chuyên nghiệp
- 📝 **Registration Form** - Form đăng ký với localStorage
- 📊 **Admin Dashboard** - Quản lý đăng ký, content, analytics
- ⚡ **Smooth Animations** - Back-to-top button, scroll effects
- 🎯 **Active Section Highlight** - Highlight navigation khi scroll
- 🔒 **Password Protected Admin** - Bảo vệ trang admin

## 🚀 Quick Start

### Cài đặt

\`\`\`bash
# Clone dự án
git clone https://github.com/your-repo/learn-for-growth.git
cd learn-for-growth

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
\`\`\`

Truy cập: \`http://localhost:3000\`

### Admin Access

URL: \`http://localhost:3000/admin\`  
Password: \`admin123\`

## 📋 Cấu trúc Dự án

\`\`\`
.
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx          # Admin Dashboard
│   ├── layout.tsx
│   ├── page.tsx              # Landing Page
│   └── globals.css           # Theme & Styles
├── components/
│   ├── hero-banner.tsx       # Hero Section
│   ├── navigation.tsx        # Navigation + Dark Mode
│   ├── event-details.tsx     # Event Info Cards
│   ├── speakers.tsx          # Speakers Grid
│   ├── sponsors.tsx          # Sponsors Section
│   ├── registration-form.tsx # Registration Form
│   ├── faq.tsx              # FAQ Accordion
│   ├── footer.tsx           # Footer
│   └── ui/                  # shadcn UI components
├── public/                   # Images & Assets
├── SETUP.md                  # Setup Guide (Vietnamese)
└── README.md                 # This file
\`\`\`

## 🎨 Customization

### Thay đổi Diễn giả

Edit \`components/speakers.tsx\` - \`const speakers\` array

### Thay đổi Banner

Edit \`components/hero-banner.tsx\` - \`Image src\` URL

### Thay đổi Thông tin Sự kiện

Edit \`components/event-details.tsx\` - Event info cards

### Thay đổi Màu sắc

Edit \`app/globals.css\` - CSS variables trong \`:root\`

### Thay đổi Mật khẩu Admin

Edit \`app/admin/page.tsx\` - \`adminPassword\` state

## 📚 Tài liệu Chi tiết

Xem file \`SETUP.md\` cho hướng dẫn đầy đủ:
- Cài đặt & setup
- Quản lý diễn giả
- Thay đổi banner & nội dung
- Admin dashboard
- Google Sheets integration
- Deploy lên Vercel

## 🔧 Tech Stack

- **Framework:** Next.js 16
- **React:** 19.2 (canary features)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Image Hosting:** Vercel Blob

## 📊 Admin Features

- 📋 Quản lý danh sách đăng ký
- 💾 Export CSV
- 📝 Quản lý nội dung sự kiện
- 📈 Xem thống kê
- 🔐 Password protected

## 🌐 Deployment

### Deploy lên Vercel (Recommended)

\`\`\`bash
npm run build
npm install -g vercel
vercel deploy
\`\`\`

Hoặc kết nối GitHub repo với Vercel dashboard.

## 📞 Contact

- **Email:** contact@learnforgrowth.vn
- **Phone:** 0397 588 756
- **Website:** learnforgrowth.vn
- **Location:** Đại học Kinh tế TP.HCM

## 📄 License

MIT License - Tự do sử dụng & chỉnh sửa

## 🤝 Contributing

Mọi đóng góp đều được hoan nghênh! 

---

Made with ❤️ for LEARN FOR GROWTH 2025 Seminar  
**Version:** 1.0  
**Last Updated:** November 24, 2025
\`\`\`
