import { NextRequest, NextResponse } from 'next/server';
import { trendMemeList } from '@/app/api/meme/data';

export async function GET(_: NextRequest) {
  try {
    return NextResponse.json(
      { data: trendMemeList },
      {
        status: 200,
      },
    );
  } catch (e) {
    return NextResponse.json({ error: '[INTERNAL SERVER ERROR]' }, { status: 500 });
  }
}
