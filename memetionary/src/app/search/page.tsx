'use client';

import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter') return;
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <section className="flex w-full flex-col items-center gap-5">
      <h1 className="w-full text-2xl font-bold">궁금하신 밈을 검색해보세요!</h1>
      <div className="flex w-full flex-col items-center gap-2">
        <Input onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder={'어쩔티비'} />
      </div>
    </section>
  );
}
