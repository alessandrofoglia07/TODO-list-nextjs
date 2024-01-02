'use client';

import { ModalContext } from '@/context/modalContext';
import { Scope } from '@/types';
import axios from 'axios';
import { useContext, MouseEvent } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface Props {
    scope: Scope;
    name?: string;
    id?: string;
}

const DeleteModal = ({ scope, name, id }: Props) => {
    const router = useRouter();
    const { closeModal } = useContext(ModalContext)!;

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            closeModal();
        }
    };

    const handleDelete = async () => {
        try {
            if (!id) return closeModal();

            if (scope === 'LIST') {
                await axios.delete(`/api/lists`, { data: { id } });
            } else if (scope === 'TAG') {
                await axios.delete(`/api/tags`, { data: { id } });
            }

            closeModal();
        } catch (err) {
            console.log(err);
        } finally {
            closeModal();
            router.refresh();
        }
    };

    return (
        <div id='outside-modal' onClick={handleClick} className='appear fixed inset-0 z-10 h-full w-full bg-black/40'>
            <div className='fixed left-1/2 top-1/2 flex h-fit max-h-[90vh] min-h-10 w-max min-w-10 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white px-16 pb-20'>
                <div className='ml-auto flex h-24 items-center'>
                    <button id='close-modal' onClick={closeModal} className='shadow-hover mt-12 p-2'>
                        <MdClose className='h-8 w-8' />
                    </button>
                </div>
                <h2 className='mb-4 pr-16 pt-8 text-lg font-semibold'>
                    Do you want to delete {name || 'this'} {scope === 'LIST' ? 'list' : 'tag'}?
                </h2>
                <div className='flex w-full items-center gap-4 pt-4'>
                    <button onClick={handleDelete} className='shadow-hover flex w-1/2 items-center justify-center gap-2 rounded-xl bg-red-400 px-8 py-4 font-semibold text-slate-100'>
                        Delete it <MdDelete className='h-6 w-6' />
                    </button>
                    <button onClick={handleClick} className='shadow-hover w-1/2 rounded-xl bg-slate-200 px-8 py-4 font-semibold'>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
