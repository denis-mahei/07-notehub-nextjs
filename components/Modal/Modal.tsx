"use client"
import css from './Modal.module.css';
import {createPortal} from "react-dom";
import {ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";

interface ModalProps {
    children?: ReactNode;
    onCloseModal?: () => void;
}

const Modal = ({children, onCloseModal}: ModalProps) => {
    const router = useRouter();
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    const handleCloseModal = () => {
        if (onCloseModal) {
            onCloseModal();
        } else {
            router.back();
        }
    };
    
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleCloseModal}
        >
            <div className={css.modal} onClick={handleModalClick}>
                {children}
            </div>
        </div> as ReactNode,
        document.body
    );
};
export default Modal