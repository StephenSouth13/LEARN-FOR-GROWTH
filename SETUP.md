# LEARN FOR GROWTH 2025 - Comprehensive Setup Guide

Hướng dẫn chi tiết để cài đặt, quản lý và triển khai trang web sự kiện với CMS Admin đầy đủ.

---

## Table of Contents

1. [Cài đặt ban đầu](#cài-đặt-ban-đầu)
2. [Quản lý Admin Dashboard](#quản-lý-admin-dashboard)
3. [Quản lý Diễn giả](#quản-lý-diễn-giả)
4. [Quản lý Đơn vị hỗ trợ](#quản-lý-đơn-vị-hỗ-trợ)
5. [Quản lý FAQ](#quản-lý-faq)
6. [Quản lý Ảnh bìa](#quản-lý-ảnh-bìa)
7. [Cách hoạt động - Data Sync](#cách-hoạt-động---data-sync)
8. [Tích hợp Google Sheets](#tích-hợp-google-sheets)
9. [Triển khai lên Vercel](#triển-khai-lên-vercel)
10. [Troubleshooting](#troubleshooting)

---

## Cài đặt ban đầu

### Yêu cầu
- Node.js 18 trở lên
- npm hoặc yarn
- Git
- Vercel account (tùy chọn, để deploy)

### Bước 1: Clone hoặc tải dự án

**Nếu có GitHub:**
\`\`\`bash
git clone <your-repository-url>
cd learn-for-growth
\`\`\`

**Nếu tải ZIP:**
\`\`\`bash
unzip learn-for-growth.zip
cd learn-for-growth
\`\`\`

### Bước 2: Cài đặt dependencies

\`\`\`bash
npm install
# hoặc
yarn install
\`\`\`

### Bước 3: Cấu hình environment variables

Tạo file `.env.local` trong thư mục root:

\`\`\`
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
\`\`\`

**⚠️ Lưu ý:** 
- `.env.local` chỉ dùng cho development
- Đổi mật khẩu `admin123` thành một mật khẩu an toàn hơn
- Không commit `.env.local` lên GitHub

### Bước 4: Chạy ứng dụng

\`\`\`bash
npm run dev
\`\`\`

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Bước 5: Truy cập Admin Dashboard

1. Mở: `http://localhost:3000/admin`
2. Nhập mật khẩu (mặc định: `admin123`)
3. Nhấn **Đăng nhập**

---

## Quản lý Admin Dashboard

### Các Tab chính

Admin dashboard có **6 tab chính**:

| Tab | Chức năng |
|-----|----------|
| **Đăng ký** | Xem danh sách người đăng ký, tải CSV |
| **Nội dung** | Quản lý ảnh bìa (banner) |
| **Diễn giả** | CRUD diễn giả: thêm, chỉnh sửa, xóa |
| **Đơn vị hỗ trợ** | CRUD sponsor: thêm, chỉnh sửa, xóa |
| **FAQ** | CRUD câu hỏi thường gặp |
| **Thống kê** | Xem số liệu thống kê sự kiện |

### Đổi mật khẩu Admin

**Cách 1: Thay đổi file (Dev Mode)**

Mở `.env.local`:
\`\`\`
NEXT_PUBLIC_ADMIN_PASSWORD=mật-khẩu-mới-của-bạn
\`\`\`

Lưu file và restart dev server:
\`\`\`bash
npm run dev
\`\`\`

**Cách 2: Trên Vercel (Production)**

1. Truy cập [Vercel Dashboard](https://vercel.com)
2. Vào **Settings** → **Environment Variables**
3. Tìm `NEXT_PUBLIC_ADMIN_PASSWORD`
4. Chỉnh sửa giá trị
5. Nhấn **Save**
6. Ứng dụng sẽ tự động redeploy

### Tải danh sách đăng ký

1. Vào tab **Đăng ký**
2. Nhấn **Tải xuống CSV**
3. File sẽ được download: `registrations_YYYY-MM-DDTHH:MM:SS.csv`

---

## Quản lý Diễn giả

### Cách CMS hoạt động

**Trước đây (cách cũ):** Phải sửa file `components/speakers.tsx` → Rebuild → Deploy

**Bây giờ (CMS):** Chỉnh sửa từ Admin → Thay đổi ngay lập tức trên landing page

### Thêm diễn giả mới

1. Vào Admin Dashboard → Tab **Diễn giả**
2. Nhấn **Thêm diễn giả**
3. Điền thông tin:
   - **Tên**: Tên đầy đủ (VD: Đoàn Đức Minh)
   - **Chức vụ**: Vị trí công việc (VD: Phó Trưởng khoa Du lịch - UEH)
   - **Ảnh đại diện**: Upload từ máy hoặc nhập URL
   - **Tiểu sử**: Mô tả ngắn (100-200 ký tự)

4. Nhấn **Lưu** trong form chỉnh sửa
5. Nhấn **Lưu tất cả diễn giả** ở dưới cùng
6. Quay lại `/` để xem thay đổi ngay lập tức

### Chỉnh sửa thông tin diễn giả

1. Vào tab **Diễn giả**
2. Tìm diễn giả cần chỉnh sửa
3. Nhấn **Chỉnh sửa**
4. Thay đổi thông tin cần thiết
5. Nhấn **Lưu** → **Lưu tất cả diễn giả**

### Xóa diễn giả

1. Nhấn **Xóa** (icon thùng rác) trên card diễn giả
2. Xác nhận xóa
3. Nhấn **Lưu tất cả diễn giả**

### Upload ảnh diễn giả từ máy

**Khi chỉnh sửa diễn giả:**

1. Nhấn **Chỉnh sửa**
2. Tìm mục **Upload ảnh đại diện từ máy**
3. Kéo thả hoặc chọn file ảnh từ máy (JPG, PNG)
4. Hoặc nhập **URL ảnh** nếu có sẵn online
5. Nhấn **Lưu**

**Yêu cầu ảnh:**
- Định dạng: JPG, PNG, WebP
- Kích thước: 600x600px (hình vuông tốt nhất)
- Dung lượng: < 5MB (nếu upload từ máy)
- Độ phân giải: >= 72 DPI

---

## Quản lý Đơn vị hỗ trợ

### Thêm đơn vị hỗ trợ

1. Vào Admin Dashboard → Tab **Đơn vị hỗ trợ**
2. Nhấn **Thêm đơn vị**
3. Điền thông tin:
   - **Tên đơn vị**: Tên công ty/tổ chức (VD: UEH University)
   - **Loại hỗ trợ**: Loại tài trợ (VD: "Tài trợ", "Đơn vị đồng hành", "Tổ chức chính")
4. Nhấn **Lưu** → **Lưu tất cả đơn vị hỗ trợ**

### Chỉnh sửa/Xóa đơn vị hỗ trợ

- **Chỉnh sửa**: Nhấn **Chỉnh sửa** → Thay đổi → **Lưu**
- **Xóa**: Nhấn **Xóa** → Xác nhận → **Lưu tất cả đơn vị hỗ trợ**

---

## Quản lý FAQ

### Thêm câu hỏi

1. Vào Admin Dashboard → Tab **FAQ**
2. Nhấn **Thêm câu hỏi**
3. Điền thông tin:
   - **Câu hỏi**: Câu hỏi từ người dùng (VD: "Buổi hội thảo có phí không?")
   - **Trả lời**: Câu trả lời chi tiết (có thể dài)
4. Nhấn **Lưu** → **Lưu tất cả câu hỏi**

### Chỉnh sửa/Xóa câu hỏi

- **Chỉnh sửa**: Nhấn **Chỉnh sửa** → Thay đổi → **Lưu**
- **Xóa**: Nhấn **Xóa** → Xác nhận → **Lưu tất cả câu hỏi**

---

## Quản lý Ảnh bìa

### Thay đổi ảnh banner

Vào Admin Dashboard → Tab **Nội dung**

#### Cách 1: Upload ảnh từ máy

1. Mục **Upload ảnh bìa từ máy**
2. Kéo thả hoặc chọn file ảnh
3. Xem preview
4. Nhấn **Cập nhật ảnh bìa**

#### Cách 2: Nhập URL ảnh

1. Mục **Hoặc nhập URL ảnh bìa**
2. Paste URL ảnh
3. Xem preview
4. Nhấn **Cập nhật ảnh bìa**

**Yêu cầu ảnh banner:**
- Định dạng: JPG, PNG, WebP
- Kích thước: 1920x1080px trở lên (16:9 aspect ratio)
- Dung lượng: < 5MB (upload) hoặc < 10MB (URL)

---

## Cách hoạt động - Data Sync

### Luồng dữ liệu

\`\`\`
Admin Dashboard (chỉnh sửa) 
    ↓
localStorage (lưu dữ liệu)
    ↓
Landing Page (tải từ localStorage)
    ↓
Hiển thị ngay lập tức (Real-time)
\`\`\`

### Dữ liệu lưu ở đâu?

**Development (localhost):**
- Browser localStorage
- Dữ liệu mất khi clear cache

**Production (Vercel):**
- Mỗi người dùng có localStorage riêng
- Dữ liệu không đồng bộ giữa các thiết bị

### Cách làm cho dữ liệu đồng bộ

Để dữ liệu luôn cập nhật trên mọi thiết bị, cần **backend database**:

**Tùy chọn 1: Supabase (PostgreSQL)**
\`\`\`
Admin → Save to DB → API → Landing Page
\`\`\`

**Tùy chọn 2: Firebase (NoSQL)**
\`\`\`
Admin → Firestore → Real-time listener → Landing Page
\`\`\`

**Tùy chọn 3: MongoDB**
\`\`\`
Admin → Express API → MongoDB → Landing Page
\`\`\`

**Tùy chọn 4: Google Sheets (Đơn giản)**
\`\`\`
Admin → Google Apps Script → Google Sheet
\`\`\`

---

## Tích hợp Google Sheets

### Tại sao Google Sheets?

✅ Đơn giản, không cần backend  
✅ Chia sẻ dữ liệu với team dễ dàng  
✅ Phân tích dữ liệu trong Sheets  
✅ Backup tự động  

### Setup từng bước

#### Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới: **Untitled spreadsheet**
3. Đặt tên: `LEARN_FOR_GROWTH_Registrations`
4. Tạo headers (hàng 1):
   - A: Họ tên
   - B: Email
   - C: Số điện thoại
   - D: Công ty
   - E: Thời gian đăng ký

#### Bước 2: Chia sẻ Sheet công khai

1. Nhấn **Share** (góc phải trên)
2. Chọn **Anyone with the link** → **Viewer**
3. Copy link (VD: `https://docs.google.com/spreadsheets/d/1ABC123...`)
4. Lấy ID sheet từ link: `1ABC123`

#### Bước 3: Tạo Google Apps Script

1. Mở Sheet vừa tạo
2. Vào **Extensions** → **Apps Script**
3. Xóa code mặc định
4. Paste code này:

\`\`\`javascript
const SHEET_ID = 'YOUR_SHEET_ID'; // Thay bằng ID thực của bạn

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getActiveSheet();
    
    sheet.appendRow([
      params.fullName,
      params.email,
      params.phone,
      params.organization || '',
      new Date().toLocaleString('vi-VN')
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({success: true})
    ).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

5. Lưu file (Ctrl+S)

#### Bước 4: Deploy Apps Script

1. Nhấn **Deploy** → **New deployment**
2. Chọn type: **Web app**
3. Execute as: Tài khoản Google của bạn
4. Who has access: **Anyone**
5. Nhấn **Deploy**
6. Copy URL deployment (VD: `https://script.google.com/macros/d/...`)

#### Bước 5: Cập nhật Landing Page

Mở `components/registration-form.tsx`:

Tìm hàm `handleSubmit` và thêm code gọi Google Apps Script:

\`\`\`typescript
// Sau khi submit form
const scriptUrl = 'YOUR_DEPLOYED_SCRIPT_URL'; // Paste URL từ bước 4

const response = await fetch(scriptUrl, {
  method: 'POST',
  body: JSON.stringify({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    organization: formData.organization
  })
});

if (response.ok) {
  console.log('Đã lưu vào Google Sheets');
}
\`\`\`

#### Bước 6: Test

1. Làm mới landing page
2. Submit form đăng ký
3. Check Google Sheet - dữ liệu phải xuất hiện trong 1-2 giây

---

## Triển khai lên Vercel

### Bước 1: Push code lên GitHub

\`\`\`bash
git add .
git commit -m "Add CMS admin and Google Sheets integration"
git push origin main
\`\`\`

### Bước 2: Kết nối Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com)
2. Nhấn **Add New** → **Project**
3. Chọn GitHub repository
4. Nhấn **Import**

### Bước 3: Cấu hình Environment Variables

Trong project settings:

1. Vào **Settings** → **Environment Variables**
2. Thêm biến:
   \`\`\`
   Key: NEXT_PUBLIC_ADMIN_PASSWORD
   Value: mật_khẩu_admin_mạnh_của_bạn
   \`\`\`
3. Nhấn **Save**

### Bước 4: Deploy

Vercel sẽ tự động deploy. Sau ~2 phút:
- Landing page: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`

### Custom Domain (Tùy chọn)

1. Vào **Settings** → **Domains**
2. Thêm domain của bạn
3. Thay đổi DNS records theo hướng dẫn Vercel

---

## Troubleshooting

### ❌ Admin password không hoạt động

**Nguyên nhân:** `.env.local` không được nhận
**Cách sửa:**
1. Xóa file `.env.local`
2. Tạo lại file `.env.local`
3. Lưu file
4. Restart dev server: `npm run dev`
5. Clear browser cache (Ctrl+Shift+Del)

### ❌ Ảnh upload không hiển thị

**Nguyên nhân:** File quá lớn hoặc định dạng sai
**Cách sửa:**
- Giảm kích thước ảnh (dùng tool như [TinyPNG](https://tinypng.com))
- Sử dụng URL ảnh thay vì upload
- Kiểm tra định dạng (JPG, PNG, WebP)

### ❌ Dữ liệu mất sau khi refresh

**Nguyên nhân:** localStorage không persistent trên Vercel
**Cách sửa:**
1. Tích hợp Google Sheets (xem phần trên)
2. Hoặc setup database (Supabase, Firebase, MongoDB)

### ❌ Google Sheets không nhận dữ liệu

**Nguyên nhân:** URL script hoặc SHEET_ID sai
**Cách sửa:**
1. Kiểm tra SHEET_ID chính xác
2. Deploy lại Apps Script
3. Kiểm tra browser console (F12) xem có lỗi không
4. Thử POST trực tiếp tới script URL để test

### ❌ Dark mode không hoạt động

**Nguyên nhân:** CSS không được load đúng
**Cách sửa:**
1. Clear browser cache
2. Reload hard: Ctrl+Shift+R (Windows) hoặc Cmd+Shift+R (Mac)
3. Kiểm tra file `app/globals.css` có đầy đủ không

---

## Tóm tắt Workflow

### Để thay đổi sự kiện:

\`\`\`
1. Vào http://localhost:3000/admin
2. Đăng nhập (mật khẩu: admin123)
3. Chọn tab (Diễn giả, FAQ, Đơn vị hỗ trợ, v.v.)
4. Chỉnh sửa / Thêm / Xóa
5. Nhấn "Lưu tất cả..."
6. Quay lại / xem thay đổi ngay lập tức ✅
\`\`\`

### Để deploy thay đổi lên production:

\`\`\`
1. Commit code: git commit -m "..."
2. Push: git push origin main
3. Vercel tự động deploy
4. Sau 2 phút, thay đổi live trên vercel.app ✅
\`\`\`

---

## Liên hệ & Hỗ trợ

- **Email:** contact@learngrowth.vn
- **Phone:** 0397 588 756
- **Website:** learngrowth.vn

---

**Chúc bạn thành công với LEARN FOR GROWTH 2025! 🚀**

**Phiên bản:** 2.0 (CMS)  
**Cập nhật lần cuối:** 14/11/2025
