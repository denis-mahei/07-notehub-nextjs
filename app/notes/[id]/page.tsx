import { notFound } from 'next/navigation';
import * as NoteService from "@/lib/api";
import css from './page.module.css';
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {NoteDetailsClient} from "@/app/notes/[id]/NoteDetails.client";

interface PageProps {
    params: Promise<{ id: string }>
}

const Page = async ({params}: PageProps) => {
    const {id} = await params;
    const queryClient = new QueryClient();


    const note = await NoteService.getNoteById(id).catch(() => {
        notFound();
    });

    if (!note) {
        notFound();
    }

    await queryClient.prefetchQuery({
        queryKey: ['note',id],
        queryFn: () => NoteService.getNoteById(id),
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
};

export default Page;