import { getMemeDetail } from '@/api/meme';
import { Meme } from '@/app/api/meme/data';
import TrendMeme from '@/components/Meme/TrendMeme';

// const getTrendMemeList = async (): Promise<{ data: Meme[] }> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/meme/trend`);
//   console.log(process.env.NEXT_PUBLIC_URL);
//   console.log(res);
//   if (!res.ok) throw new Error('Failed to fetch data!!!!!!>o<');
//   return res.json();
// };

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const meme = await getMemeDetail({ id: '1' });
  console.log(meme);
  return (
    <div className="flex h-fit w-full flex-col items-center gap-8 p-5">
      {children}
      {/* <TrendMeme /> */}
    </div>
  );
}
