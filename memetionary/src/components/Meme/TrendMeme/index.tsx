'use client';

import { useEffect, useState } from 'react';
import { Meme } from '@/app/api/meme/data';
import Link from 'next/link';

const TITLE_TEXT = '요즘 뜨는 밈';

const TrendMeme = () => {
  const [trendMemeList, setTrendMemeList] = useState<Meme[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendMemeList = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/meme/trend`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setTrendMemeList(data.data);
      } catch (err) {
        throw new Error('Failed to fetch data');
      }
    };

    fetchTrendMemeList();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex w-full flex-col items-center gap-2">
      <h2 className="text-xl font-bold">{TITLE_TEXT}</h2>
      <ul className="grid h-fit w-full grid-cols-2 grid-rows-2 gap-2">
        {trendMemeList.map(({ id, title }) => (
          <li key={id}>
            <Link
              className="flex aspect-video w-full select-none items-center justify-center rounded-md bg-primary-100 text-lg font-semibold"
              href={`/meme/${id}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendMeme;
