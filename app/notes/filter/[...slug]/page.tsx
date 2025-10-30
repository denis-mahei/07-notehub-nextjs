import NotesClient from "./Notes.client";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getAllNotes} from "@/lib/api";
import {dehydrate} from "@tanstack/query-core";

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

const Page = async ({ params }: PageProps) => {
    const { slug } = await params;
    const filterValue = slug[0];
    
    const tag = filterValue === 'all' ? undefined : filterValue;
    
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', '', 1, tag],
        queryFn: () => getAllNotes('', 1, undefined, 10, tag),
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient filterTag={tag} />
            </HydrationBoundary>
        </>
    );
};

export default Page;