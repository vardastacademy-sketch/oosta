import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { createJob } from '../actions';
import { Button } from '@/components/ui/Button';

export default function NewJobPage() {
  return (
    <>
      <Header />
      <main className="px-5 pb-24">
        <h2 className="text-xl font-bold text-white mb-6">ایجاد آگهی جدید</h2>
        <form action={createJob} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">عنوان پروژه</label>
                <input name="title" type="text" required className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="مثلاً: طراحی لوگو با میدجورنی" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">دسته‌بندی</label>
                <select name="category" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none">
                    <option value="Prompt Engineering">مهندسی پرامپت</option>
                    <option value="Image Generation">تصویرسازی</option>
                    <option value="Coding">کدنویسی</option>
                    <option value="Copywriting">نویسندگی</option>
                    <option value="Video">ویدیو</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">بودجه (تومان)</label>
                <input name="budget" type="text" required className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="5,000,000" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">تگ‌ها (با کاما جدا کنید)</label>
                <input name="tags" type="text" className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="Midjourney, Logo Design" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">توضیحات کامل</label>
                <textarea name="description" required rows={5} className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="توضیحات پروژه را بنویسید..."></textarea>
            </div>

            <Button type="submit" fullWidth>انتشار آگهی</Button>
        </form>
      </main>
      <BottomNav />
    </>
  );
}
