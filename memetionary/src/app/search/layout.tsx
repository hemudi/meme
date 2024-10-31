import TrendMeme from '@/components/Meme/TrendMeme';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-fit w-full flex-col items-center gap-8 p-5">
      {children}
      <TrendMeme />
    </div>
  );
}
