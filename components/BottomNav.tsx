'use client';
import Link from 'next/link';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-panel backdrop-blur-xl bg-[#131118]/80 border-t border-white/10 pb-5 pt-3 px-6">
        <div className="flex justify-between items-end">
          <Link href="/" className={`flex flex-col items-center gap-1 group ${isActive('/') && pathname === '/' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Home size={24} fill={isActive('/') && pathname === '/' ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold">خانه</span>
          </Link>
          <Link href="/jobs" className={`flex flex-col items-center gap-1 group ${isActive('/jobs') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Search size={24} />
            <span className="text-[10px] font-medium">جستجو</span>
          </Link>
          <Link href="/jobs/new" className="flex flex-col items-center justify-end -mt-8 group">
            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-[#131118] group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-medium text-gray-400 mt-1">آگهی</span>
          </Link>
          <Link href="/messages" className={`flex flex-col items-center gap-1 group ${isActive('/messages') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <MessageSquare size={24} />
            <span className="text-[10px] font-medium">پیام‌ها</span>
          </Link>
          <Link href="/profile/me" className={`flex flex-col items-center gap-1 group ${isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <User size={24} />
            <span className="text-[10px] font-medium">پروفایل</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
