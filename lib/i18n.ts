export type Language = 'vi' | 'en'

export const translations = {
  vi: {
    nav: {
      event: 'Sự kiện',
      speakers: 'Diễn giả',
      register: 'Đăng ký',
      faq: 'Câu hỏi',
      admin: 'Admin',
    },
    hero: {
      cta_register: 'Đăng ký ngay',
      cta_details: 'Xem chi tiết',
    },
    register: {
      title: 'Đăng ký tham gia',
      subtitle: 'Điền thông tin dưới đây để đảm bảo chỗ ngồi của bạn. Chỗ ngồi có hạn!',
      success_title: 'Đăng ký thành công!',
      success_message: 'Chúng tôi sẽ liên hệ với bạn sớm.',
      submit: 'Đăng ký ngay',
    },
    common: {
      required: 'Bắt buộc',
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Chỉnh sửa',
      add: 'Thêm',
      loading: 'Đang tải...',
    }
  },
  en: {
    nav: {
      event: 'Event',
      speakers: 'Speakers',
      register: 'Register',
      faq: 'FAQ',
      admin: 'Admin',
    },
    hero: {
      cta_register: 'Register Now',
      cta_details: 'View Details',
    },
    register: {
      title: 'Register to Join',
      subtitle: 'Fill in your information below to secure your seat. Limited slots available!',
      success_title: 'Registration Successful!',
      success_message: 'We will contact you soon.',
      submit: 'Register Now',
    },
    common: {
      required: 'Required',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      loading: 'Loading...',
    }
  }
}

export const defaultLanguage: Language = 'vi'
