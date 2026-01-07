import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import JobCard from '@/components/JobCard';
import { createClient } from '@/utils/supabase/server';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.cat === 'string' ? params.cat : undefined
  const query = typeof params.q === 'string' ? params.q : undefined

  const supabase = await createClient();

  let dbQuery = supabase.from('jobs').select('*').order('created_at', { ascending: false });

  if (category) {
      // Mapping simplified categories to real ones if needed, or simple ilike
      // For now assume direct match or simple logic
      if (category === 'code') dbQuery = dbQuery.eq('category', 'Coding');
      // ... expand mappings
  }
  if (query) {
      dbQuery = dbQuery.ilike('title', `%${query}%`);
  }

  const { data: jobs } = await dbQuery;

  return (
    <>
      <Header />
      <main className="px-5 pb-24">
         <div className="flex flex-col gap-4">
             <form className="relative group">
                <input name="q" defaultValue={query} className="block w-full p-4 pr-12 text-sm text-white bg-[#2c2839]/50 border border-white/10 rounded-2xl focus:ring-primary focus:border-primary placeholder-gray-400 backdrop-blur-md transition-all focus:bg-[#2c2839]/80" placeholder="جستجو در میان پروژه‌ها..." type="text"/>
             </form>
            <h3 className="text-lg font-bold text-white mb-1">
                {category ? `نتایج برای ${category}` : 'همه پروژه‌ها'}
            </h3>
            {jobs && jobs.map(job => <JobCard key={job.id} job={job} />)}
         </div>
      </main>
      <BottomNav />
    </>
  );
}
