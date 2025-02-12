import Image from 'next/image';
import { WithChildren } from '@/lib/types';

export const Empty = ({ children }: WithChildren) => (
  <div className="flex flex-col justify-center items-center h-full p-20">
    <div className="relative w-[600px] h-[450px]">
      <Image
        src="/empty.png"
        alt="Empty"
        fill
      />
      <p className="text-muted-foreground text-sm text-center">
        {children}
      </p>
    </div>
  </div>
)
