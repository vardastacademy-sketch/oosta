import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient();
  const { data: job } = await supabase.from('jobs').select('*, profiles(full_name, avatar_url)').eq('id', id).single();

  if (!job) {
      notFound();
  }

  return (
    <>
      <Header />
      <main className="px-5 pb-24 flex flex-col gap-6">
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
             <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-xl font-bold text-white">{job.title}</h1>
                    <p className="text-sm text-gray-400 mt-1">{job.category}</p>
                </div>
                <span className="text-primary font-bold text-lg bg-primary/10 px-3 py-1 rounded-lg">
                    {job.budget ? `${parseInt(job.budget).toLocaleString()} تومان` : 'توافقی'}
                </span>
             </div>

             <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                    {/* Placeholder for avatar */}
                </div>
                <div>
                    <p className="text-sm font-bold text-white">{(job.profiles as any)?.full_name || 'کارفرما'}</p>
                    <p className="text-xs text-gray-400">ارسال شده در {new Date(job.created_at).toLocaleDateString('fa-IR')}</p>
                </div>
             </div>

             <div className="border-t border-white/5 pt-4">
                <h3 className="text-lg font-bold text-white mb-2">توضیحات پروژه</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
             </div>

             <div className="flex gap-2 flex-wrap">
                 {job.tags?.map((tag: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-[#151022] border border-white/5 text-[11px] text-gray-300">
                        {tag}
                     </span>
                 ))}
             </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background-dark border-t border-white/10 flex justify-between items-center pb-24">
             <Button fullWidth>ارسال درخواست</Button>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
