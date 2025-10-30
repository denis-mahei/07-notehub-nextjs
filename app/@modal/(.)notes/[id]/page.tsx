import { notFound } from 'next/navigation';
import * as NoteService from "@/lib/api";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {NotePreviewClient} from "./NotePreview.client";

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
        queryKey: ['note', id],
        queryFn: () => NoteService.getNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient id={id} />
        </HydrationBoundary>
    );
};

export default Page;