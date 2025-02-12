import Image from 'next/image';

export const Loader = () => (
  <div className="flex flex-col justify-center items-center h-full gap-4">
    <div className="relative w-10 h-10 animate-spin">
      <Image
        src="vercel.svg"
        alt="Logo"
        fill
      />
    </div>
    <p className="text-sm text-muted-foreground">
      Genjus is thinking...
    </p>
  </div>
)
