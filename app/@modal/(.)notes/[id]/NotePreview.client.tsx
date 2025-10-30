"use client"
import Modal from "@/components/Modal/Modal";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import * as NoteService from "@/lib/api";
import {formatDate} from "@/lib/dateUtils";

interface NotePreviewClientProps {
    id: string;
}

export const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
    const router = useRouter();
    const {data, isError, isLoading} = useQuery({
        queryKey: ['note', id],
        queryFn: () => NoteService.getNoteById(id),
        refetchOnMount: false
    });

    const handleCloseModal = () => {
        router.back();
    };

    return (
        <Modal onCloseModal={handleCloseModal}>
            {isLoading && (
                <div style={{padding: '20px', textAlign: 'center'}}>
                    Loading...
                </div>
            )}
            {isError && (
                <div style={{padding: '20px', textAlign: 'center', color: 'red'}}>
                    Something went wrong.
                </div>
            )}
            {data && (
                <div style={{padding: '20px', maxWidth: '500px'}}>
                    <h2>{data.title}</h2>
                    <p>{data.content}</p>
                    <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                        {formatDate(data.createdAt)}
                    </p>
                    <div
                        style={{
                            marginTop: '10px',
                            padding: '5px 10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '4px',
                            display: 'inline-block'
                        }}
                    >
                        {data.tag}
                    </div>
                </div>
            )}
        </Modal>
    );
};