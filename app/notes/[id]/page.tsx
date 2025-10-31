import { notFound } from 'next/navigation';
import * as NoteService from '@/lib/api';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { NoteDetailsClient } from '@/app/notes/[id]/NoteDetails.client';
import { getNoteById } from '@/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<{ title: string; description: string }> => {
  const { id } = await params;
  const note = await getNoteById(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    // openGraph: {
    //   title: `Note: ${note.title}`,
    //   description: note.content.slice(0,100),
    // }
  };
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  const note = await NoteService.getNoteById(id).catch(() => {
    notFound();
  });

  if (!note) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => NoteService.getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default Page;
