import { WithChildren } from '@/lib/types';

export default function AuthLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-1 justify-center items-center min-h-full">
      {children}
    </div>
  )
}
