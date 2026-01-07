import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import JobCard from '@/components/JobCard';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { PlusCircle, Bot, Palette, Terminal, FileText, Video } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const { data: jobs } = await supabase.from('jobs').select('*').order('created_at', { ascending: false }).limit(5);

  const categories = [
    { name: 'چت‌بات', icon: <Bot size={24} />, href: '/jobs?cat=chatbot' },
    { name: 'تصویرسازی', icon: <Palette size={24} />, href: '/jobs?cat=image' },
    { name: 'کدنویسی', icon: <Terminal size={24} />, href: '/jobs?cat=code' },
    { name: 'نویسندگی', icon: <FileText size={24} />, href: '/jobs?cat=copy' },
    { name: 'ویدیو', icon: <Video size={24} />, href: '/jobs?cat=video' },
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 pb-24">
        {/* Search Bar Placeholder - Visual only as per design, functional search in /jobs */}
        <div className="px-5">
            <Link href="/jobs" className="block w-full p-4 pr-12 text-sm text-gray-400 bg-[#2c2839]/50 border border-white/10 rounded-2xl">
                جستجو در میان پروژه‌ها...
            </Link>
        </div>

        {/* Hero Section */}
        <div className="px-5">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-gradient-to-r from-indigo-900 to-purple-900 min-h-[180px]">
                <div className="relative p-6 flex flex-col items-start gap-4 justify-center h-full">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/30 border border-primary/50 text-xs font-bold text-primary mb-2 backdrop-blur-sm">ویژه</span>
                        <h2 className="text-xl font-bold text-white leading-tight mb-1">به دنبال اوستاکار هستید؟</h2>
                        <p className="text-gray-300 text-sm max-w-[70%] leading-relaxed">بهترین مهندسین پرامپت را برای پروژه هوش مصنوعی خود پیدا کنید.</p>
                    </div>
                    <Link href="/jobs/new" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-primary/25">
                        <PlusCircle size={20} />
                        ایجاد پروژه
                    </Link>
                </div>
            </div>
        </div>

        {/* Categories Rail */}
        <div className="flex flex-col gap-3">
            <div className="px-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">دسته‌بندی‌ها</h3>
                <Link href="/jobs" className="text-primary text-sm font-medium hover:text-primary/80">مشاهده همه</Link>
            </div>
            <div className="flex overflow-x-auto gap-4 px-5 pb-2 no-scrollbar snap-x">
                {categories.map((cat, i) => (
                    <Link key={i} href={cat.href} className="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
                        <div className="w-16 h-16 rounded-full bg-[#2c2839] border border-white/5 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                            {cat.icon}
                        </div>
                        <span className="text-xs text-gray-400 font-medium group-hover:text-white transition-colors">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>

        {/* Latest Jobs List */}
        <div className="flex flex-col gap-4 px-5">
            <h3 className="text-lg font-bold text-white mb-1">جدیدترین پروژه‌ها</h3>
            {jobs && jobs.length > 0 ? (
                jobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
                <p className="text-gray-400 text-sm">هیچ پروژه‌ای یافت نشد.</p>
            )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
