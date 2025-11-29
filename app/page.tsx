// app/page.tsx
import Navigation from '@/components/navigation'
import HeroBanner from '@/components/hero-banner'
import EventDetails from '@/components/event-details'
import Speakers from '@/components/speakers'
import Sponsors from '@/components/sponsors'
import RegistrationForm from '@/components/registration-form'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
// Sửa lỗi import supabase: Thay thế 'supabase' bằng hàm createClient
import { createClient } from '@/lib/supabase-server' 

// Định nghĩa Types cho Settings để sửa lỗi Parameter 's' implicitly has an 'any' type.
interface Setting {
    key: string;
    value: any; // Sử dụng any vì value có thể là string (url) hoặc JSON string (form fields)
}

// ... metadata và revalidate ...

export default async function Home() {
    // 1. Dùng hàm createClient() mới để có client Server Component an toàn
    const supabase = createClient(); 

    // Tìm nạp tất cả dữ liệu song song để tối ưu tốc độ
    const [speakersRes, faqsRes, settingsRes, sponsorsRes] = await Promise.all([
        supabase.from('speakers').select('*, image:image_url').order('created_at'),
        supabase.from('faqs').select('*').order('created_at'),
        supabase.from('settings').select('key, value'),
        supabase.from('sponsors').select('*').order('created_at'),
    ]);

    const speakers = speakersRes.data ? speakersRes.data.map(s => ({ ...s, image: s.image || s.image_url })) : [];
    const faqs = faqsRes.data ?? [];
    const sponsors = sponsorsRes.data ?? [];
    
    // Sửa lỗi any type bằng cách gán Type Settings[]
    const settings: Setting[] = settingsRes.data ?? []; 
    
    // Lấy banner URL, sử dụng tên prop CHÍNH XÁC là 'bannerImageUrl' như trong component HeroBanner
    const bannerImageUrl = settings.find((s: Setting) => s.key === 'banner_image_url')?.value ?? '/images/banner-02.png';
    const formFieldsString = settings.find((s: Setting) => s.key === 'form_fields')?.value;
    
    let formFields = [];
    try {
        formFields = formFieldsString ? JSON.parse(formFieldsString) : [];
    } catch (e) {
        console.error("Failed to parse form fields JSON:", e);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
            <Navigation />
            {/* Sửa lỗi 2322: Truyền prop 'bannerImageUrl' thay vì 'bannerUrl' */}
            <HeroBanner bannerImageUrl={bannerImageUrl} /> 
            <EventDetails />
            <RegistrationForm formFields={formFields} />
            <Speakers speakers={speakers} />
            <Sponsors sponsors={sponsors} />
            <FAQ faqs={faqs} />
            <Footer />
        </div>
    )
}