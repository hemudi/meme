'use client';

import axios from 'axios';
import type { Meme } from '@/app/api/meme/data';
import Input from '@/components/Input';
import MemeList from '@/components/Meme/MemeList';
import Pagination from '@/components/Pagination';
import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function SearchResultPage() {
  const router = useRouter();
  const { keyword } = useParams<{ keyword: string }>();
  const searchKeyword = decodeURIComponent(keyword);
  const [value, setValue] = useState<string>('');
  const [pageNo, setPageNo] = useState<number>(1);
  const [lastPageNo, setLastPageNo] = useState<number>(0);
  const [resultMemeList, setResultMemeList] = useState<Meme[]>([]);
  const isNoResult = resultMemeList.length === 0;
  const [loading, setLoading] = useState<boolean>(false);

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter') return;
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/meme/list?pageNo=${pageNo}&keyword=${searchKeyword}`)
      .then(({ data }) => {
        const { data: result, pagination } = data;
        setResultMemeList(result);
        setLastPageNo(pagination.lastPageNo);
        console.log(pagination);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageNo, searchKeyword]);

  return (
    <section className="flex w-full flex-col items-center gap-3">
      <h1 className="w-full text-2xl font-bold">{`${loading ? '검색 중...' : isNoResult ? '검색 결과가 없습니다!' : `"${searchKeyword}" 검색 결과`}`}</h1>
      <div className="flex w-full flex-col items-center gap-2">
        <Input onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder={'어쩔티비'} />
      </div>
      {loading ? (
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-primary-800" />
      ) : (
        !isNoResult && (
          <>
            <MemeList memeList={resultMemeList} />
            <Pagination lastPageNo={lastPageNo} currentPageNo={pageNo} setPageNo={setPageNo} />
          </>
        )
      )}
    </section>
  );
}
