import TitleDetail from '@/components/Meme/TitleDetail';
import Evaluation from '@/components/Meme/Evaluation';
import TagList from '@/components/Meme/TagList';
import DetailAction from '@/components/Meme/DetailAction';
import FooterDetail from '@/components/Meme/FooterDetail';
import { getMemeDetail } from '@/api/meme';
import Description from '@/components/Meme/Article';
import Conversation from '@/components/Meme/Conversation';
import Ping from '@/components/Meme/Ping';

export default async function Meme({ params: { id } }: { params: { id: string } }) {
  const meme = await getMemeDetail({ id });

  return (
    <>
      <div className="flex w-full items-end justify-between">
        <h2 className="text-3xl font-bold">{meme.title}</h2>
        <TitleDetail
          view={meme.view}
          evaluation={meme.evaluation}
          contents={{ title: meme.title, text: meme.description || '', imageUrl: meme.image }}
        />
      </div>
      {/* {meme.image && <Thumbnail src={meme.image} title={meme.title} size="lg" />} */}
      <Description title={meme.title} content={meme.description} />
      {meme.exampleType === 'conversation' ? <Conversation content={meme.example} /> : <Ping content={meme.example} />}
      {meme.tags && <TagList list={meme.tags} />}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <FooterDetail view={meme.view} lastUpdate={meme.lastUpdate} />
        <DetailAction contents={{ title: meme.title, text: meme.description || '', imageUrl: meme.image }} />
      </div>
      <Evaluation {...meme.evaluation} />
    </>
  );
}
