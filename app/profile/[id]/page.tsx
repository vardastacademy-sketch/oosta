import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let targetId = id;
  if (id === 'me') {
      if (!user) return redirect('/login');
      targetId = user.id;
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', targetId).single();
  const { data: portfolios } = await supabase.from('portfolios').select('*').eq('user_id', targetId);

  if (!profile) return notFound();

  const isOwnProfile = user?.id === profile.id;

  return (
    <>
      <Header />
      <main className="px-4 pb-24 flex flex-col gap-6">
         {/* Header Info */}
         <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-primary overflow-hidden">
                {/* Avatar Placeholder */}
            </div>
            <div className="text-center">
                <h1 className="text-xl font-bold text-white">{profile.full_name || 'کاربر بدون نام'}</h1>
                <p className="text-primary text-sm font-medium mt-1">{profile.specialty || 'کاربر تازه وارد'}</p>
            </div>
            {isOwnProfile && (
                <Link href="/profile/edit">
                    <Button variant="outline" size="sm">ویرایش پروفایل</Button>
                </Link>
            )}
         </div>

         {/* Stats / Bio */}
         <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-2">درباره من</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {profile.bio || 'هنوز توضیحی وارد نشده است.'}
            </p>
         </div>

         {/* Portfolios */}
         <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-bold">نمونه‌کارها</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {portfolios && portfolios.length > 0 ? (
                    portfolios.map(p => (
                        <div key={p.id} className="glass-card rounded-xl p-4">
                            <h4 className="font-bold text-white">{p.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{p.description}</p>
                            {p.media_url && <div className="mt-2 h-32 bg-gray-800 rounded-lg"></div>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">هیچ نمونه کاری ثبت نشده است.</p>
                )}
            </div>
         </div>
      </main>
      <BottomNav />
    </>
  );
}
