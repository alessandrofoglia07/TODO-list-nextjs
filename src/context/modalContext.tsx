'use client';

import { PropsWithChildren, createContext, useState } from 'react';
import { ModalContextType, ModalName } from '@/types';
import CreateTodoModal from '@/components/modals/createTodoModal';
import AddListModal from '@/components/modals/addListModal';
import AddTagModal from '@/components/modals/addTagModal';

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [modalName, setModalName] = useState<ModalName | null>(null);

    const openModal = (name: ModalName) => {
        setModalName(name);
    };

    const closeModal = () => {
        setModalName(null);
    };

    const renderModal = () => {
        switch (modalName) {
            case 'createTodo':
                return <CreateTodoModal />;
            case 'addList':
                return <AddListModal />;
            case 'addTag':
                return <AddTagModal />;
            default:
                return <></>;
        }
    };

    return (
        <ModalContext.Provider value={{ modalName, openModal, closeModal }}>
            {renderModal()}
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
