'use client';

import { PropsWithChildren, createContext, useState } from 'react';
import { ModalContextType, ModalName, UnkObj } from '@/types';
import CreateTodoModal from '@/components/modals/createTodoModal';
import AddListModal from '@/components/modals/addListModal';
import AddTagModal from '@/components/modals/addTagModal';
import DeleteModal from '@/components/modals/deleteModal';
import EditModal from '@/components/modals/editModal';
import { Color } from '@prisma/client';

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [modalName, setModalName] = useState<ModalName | null>(null);
    const [modalData, setModalData] = useState<UnkObj | undefined>();

    const openModal = (name: ModalName, data?: UnkObj) => {
        setModalName(name);
        setModalData(data);
    };

    const closeModal = () => {
        setModalName(null);
        setModalData(undefined);
    };

    const renderModal = () => {
        const name = modalData?.name as string | undefined;
        const id = modalData?.id as string | undefined;

        switch (modalName) {
            case 'createTodo':
                return <CreateTodoModal />;
            case 'addList':
                return <AddListModal />;
            case 'addTag':
                return <AddTagModal />;
            case 'deleteList':
                return <DeleteModal scope='LIST' name={name} id={id} />;
            case 'deleteTag':
                return <DeleteModal scope='TAG' name={name} id={id} />;
            case 'editList':
                return <EditModal scope='LIST' name={name} id={id} color={modalData?.color as Color | undefined} />;
            case 'editTag':
                return <EditModal scope='TAG' name={name} id={id} color={modalData?.color as Color | undefined} />;
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
