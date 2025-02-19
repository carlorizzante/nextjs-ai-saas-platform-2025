import { WithChildren } from '@/lib/types';

export default async function PublicLayout({ children }: WithChildren) {
  return (
    <div className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-x-screen-xl h-full">
        {children}
      </div>
    </div>
  );
}
