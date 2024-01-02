'use client';

import { ModalContext } from '@/context/modalContext';
import { Scope } from '@/types';
import axios from 'axios';
import { useContext, MouseEvent, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/colors';
import { Color } from '@prisma/client';
import SelectColor from '../selectColor';
import { FaCheck } from 'react-icons/fa';

interface Props {
    scope: Scope;
    name?: string;
    id?: string;
    color?: Color;
}

interface Data {
    name?: string;
    color?: Color;
}

const EditModal = ({ scope, name, id, color }: Props) => {
    const router = useRouter();
    const { closeModal } = useContext(ModalContext)!;
    const [data, setData] = useState<Data>({ name, color });

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            closeModal();
        }
    };

    const handleEdit = async () => {
        try {
            if (!id) return closeModal();

            if (scope === 'LIST') {
                await axios.patch(`/api/lists`, { id, name: data.name, color: data.color });
            } else if (scope === 'TAG') {
                await axios.patch(`/api/tags`, { id, name: data.name, color: data.color });
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
                    Edit {name || 'this'} {scope === 'LIST' ? 'list' : 'tag'}
                </h2>
                <div className='flex items-center py-4'>
                    {data.color && <div className='ml-1 mr-3 aspect-square h-4 rounded-md' style={{ backgroundColor: colors('LIST', data.color) }} />}
                    <input
                        name='name'
                        placeholder='Name'
                        className='w-full text-3xl font-bold placeholder:font-semibold focus-visible:outline-none'
                        maxLength={20}
                        spellCheck={false}
                        onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        value={data.name}
                        autoComplete='off'
                    />
                </div>
                <div className='mt-4 flex items-center justify-end gap-4'>
                    <div className='flex items-center gap-4'>
                        <SelectColor scope='LIST' handleSelection={(color) => setData((prev) => ({ ...prev, color }))} />
                        <button onClick={handleEdit} className='shadow-hover p-2'>
                            <FaCheck className='h-6 w-6' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
