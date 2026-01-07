import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  // Basic check for admin role (assuming role column is properly set in DB)
  // Since we don't have a UI to set admin, we rely on manual DB entry or checking profile
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

  if (profile?.role !== 'admin') {
      return (
          <div className="flex items-center justify-center h-screen text-white">
              <p>شما دسترسی ادمین ندارید.</p>
          </div>
      )
  }

  const { data: jobs } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
  const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <main className="px-5 pb-24 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-white">داشبورد ادمین</h1>

        <section>
            <h2 className="text-lg font-bold text-primary mb-4">آخرین آگهی‌ها</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs text-gray-200 uppercase bg-surface-dark">
                        <tr>
                            <th scope="col" className="px-6 py-3">عنوان</th>
                            <th scope="col" className="px-6 py-3">وضعیت</th>
                            <th scope="col" className="px-6 py-3">تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs?.map(job => (
                            <tr key={job.id} className="bg-glass border-b border-white/5">
                                <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                                <td className="px-6 py-4">{job.status}</td>
                                <td className="px-6 py-4">{new Date(job.created_at).toLocaleDateString('fa-IR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <section>
            <h2 className="text-lg font-bold text-primary mb-4">کاربران اخیر</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs text-gray-200 uppercase bg-surface-dark">
                        <tr>
                            <th scope="col" className="px-6 py-3">نام</th>
                            <th scope="col" className="px-6 py-3">نقش</th>
                            <th scope="col" className="px-6 py-3">ایمیل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.map(p => (
                            <tr key={p.id} className="bg-glass border-b border-white/5">
                                <td className="px-6 py-4 font-medium text-white">{p.full_name || 'بدون نام'}</td>
                                <td className="px-6 py-4">{p.role}</td>
                                <td className="px-6 py-4">...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
