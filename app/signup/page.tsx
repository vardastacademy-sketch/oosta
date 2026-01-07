import Link from 'next/link'
import { signup } from '@/app/actions'
import { Button } from '@/components/ui/Button'

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="glass-card w-full max-w-md p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">ثبت نام در اوستاکار</h2>
            <form className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">نام کامل</label>
                    <input name="full_name" type="text" required className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="نام و نام خانوادگی" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">ایمیل</label>
                    <input name="email" type="email" required className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="example@mail.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">رمز عبور</label>
                    <input name="password" type="password" required className="bg-surface-dark border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none" placeholder="******" />
                </div>
                <Button formAction={signup} fullWidth className="mt-4">ثبت نام</Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-400">
                قبلاً ثبت نام کرده‌اید؟ <Link href="/login" className="text-primary hover:underline">وارد شوید</Link>
            </div>
        </div>
    </div>
  )
}
