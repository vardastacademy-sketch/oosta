import Link from 'next/link';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    category: string | null;
    budget: string | null;
    tags: string[] | null;
    created_at: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const timeAgo = new Date(job.created_at).toLocaleDateString('fa-IR');

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
             <span className="material-symbols-outlined text-white/70">work</span>
             {/* Using text placeholder for icon if material symbols not loaded, but we have lucide elsewhere. Sticking to simple text or lucide if needed. */}
          </div>
          <div>
            <h4 className="font-bold text-white text-base">{job.title}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{job.category} • پروژه</p>
          </div>
        </div>
        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-lg">
            {job.budget ? `${parseInt(job.budget).toLocaleString()} تومان` : 'توافقی'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {job.tags?.map((tag, i) => (
             <span key={i} className="px-2.5 py-1 rounded-md bg-[#151022] border border-white/5 text-[11px] text-gray-300">
                {tag}
             </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
        <span className="text-xs text-gray-500 flex items-center gap-1">
             {timeAgo}
        </span>
        <Link href={`/jobs/${job.id}`} className="text-sm font-bold text-white bg-[#2c2839] hover:bg-primary px-4 py-1.5 rounded-lg transition-colors">
            مشاهده
        </Link>
      </div>
    </div>
  );
}
