import axios from 'axios';
import { NextResponse } from 'next/server';
import { parseProperties } from '@/utils/notion';

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY || '';
const NOTION_DB_ID = process.env.NEXT_PUBLIC_NOTION_DB_ID || '';
const NOTION_API_URL = `https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`;

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
  // const id = Number(params.id);
  // const hasMemeData = memeList.find((e) => e.id === id);

  const hasMemeData = await getMeme(params.id);

  if (hasMemeData) {
    return NextResponse.json(hasMemeData);
  }

  return NextResponse.json({ status: 500 });
};

const getMeme = async (id: string) => {
  try {
    const { data } = await axios.post(
      NOTION_API_URL,
      {
        filter: {
          property: 'id',
          unique_id: {
            equals: Number(id),
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
      },
    );

    return parseProperties(data.results[0].properties);
  } catch (error) {
    throw error;
  }
};

/* Notion에서 입력된 id의 상세 데이터를 정렬해서 GET 하는 함수 */
