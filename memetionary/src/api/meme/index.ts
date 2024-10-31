import { Meme } from '@/app/api/meme/data';
import axios from 'axios';

export const getMemeDetail = async ({ id }: { id: string }) => {
  try {
    // axios.default.baseUrl 합치기
    // status 500일때 처리 필요
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/meme/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRandomMemeId = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/meme/random`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTrendMemeList = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/meme/trend`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getTrendMemeList = async (): Promise<{ data: Meme[] }> => {
//   try {
//     const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/meme/trend`);
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error('Failed to fetch data!!!');
//   }
// };
