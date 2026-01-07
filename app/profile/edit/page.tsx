import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/utils/supabase/server';
import { updateProfile } from '../actions';
import { Button } from '@/components/ui/Button';

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div className="p-10 text-center text-white">لطفا وارد شوید</div>

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <>
      <Header />
      <main className="px-4 flex flex-col gap-6 pb-24">
        <h2 className="text-xl font-bold text-white">ویرایش پروفایل</h2>

        <form action={updateProfile} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">نام و نام خانوادگی</label>
                <input name="full_name" defaultValue={profile?.full_name || ''} type="text" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">درباره من</label>
                <textarea name="bio" defaultValue={profile?.bio || ''} rows={4} className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none"></textarea>
            </div>

             <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">تخصص اصلی</label>
                <input name="specialty" defaultValue={profile?.specialty || ''} type="text" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="مثلاً مهندسی پرامپت" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">شماره تماس</label>
                <input name="phone" defaultValue={profile?.phone || ''} type="tel" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">لینکدین</label>
                <input name="linkedin" defaultValue={profile?.linkedin || ''} type="url" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">اینستاگرام</label>
                <input name="instagram" defaultValue={profile?.instagram || ''} type="text" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" />
            </div>

            <Button type="submit" fullWidth>ذخیره تغییرات</Button>
        </form>
      </main>
      <BottomNav />
    </>
  );
}
