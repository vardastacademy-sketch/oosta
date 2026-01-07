import Link from 'next/link';
import { User, Bell, Search, Settings } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between px-5 pt-8 pb-2">
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm mb-1 font-light">خوش آمدید</span>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          سلام، {user?.email?.split('@')[0] || 'مهمان'} <span className="text-xl">👋</span>
        </h1>
      </div>
      <div className="flex gap-2">
        {user ? (
            <button className="relative flex items-center justify-center w-12 h-12 rounded-xl glass-panel text-white hover:bg-white/5 transition-colors">
            <Bell size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-[#151022]"></span>
            </button>
        ) : (
            <Link href="/login" className="flex items-center justify-center px-4 h-12 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors font-bold text-sm">
                ورود
            </Link>
        )}
      </div>
    </header>
  );
}
