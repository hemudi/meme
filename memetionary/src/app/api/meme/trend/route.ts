import { NextRequest, NextResponse } from 'next/server';
import { trendMemeList } from '@/app/api/meme/data';

export async function GET(_: NextRequest) {
  try {
    return NextResponse.json(
      { data: trendMemeList },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    );
  } catch (e) {
    return NextResponse.json({ error: '[INTERNAL SERVER ERROR]' }, { status: 500 });
  }
}
