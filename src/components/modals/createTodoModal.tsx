'use client';

import { ModalContext } from '@/context/modalContext';
import { useContext, type MouseEvent, useState } from 'react';
import { MdClose } from 'react-icons/md';
import SelectColor from '@/components/selectColor';
import { colors } from '@/lib/colors';
import { Color } from '@prisma/client';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { ListClassName } from '../list';
import { TagClassName } from '../tag';
import { z } from 'zod';
import { getRandomColor } from '@/lib/getRandomColor';

const schema = z.object({
    title: z.string().min(1, 'Title required').max(50, 'Title too long'),
    content: z.string().min(1, 'Content required').max(500, 'Content too long'),
    color: z.nativeEnum(Color)
});

type Schema = z.infer<typeof schema>;

const CreateTodoModal = () => {
    const { closeModal } = useContext(ModalContext)!;
    const [data, setData] = useState<Schema>({
        title: '',
        content: '',
        color: getRandomColor()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            handleConfirm();
            closeModal();
        }
    };

    // TODO
    const handleConfirm = () => {};

    // TODO
    const handleAddTag = () => {};

    // TODO
    const handleAddList = () => {};

    const handleColorChange = (color: Color) => {
        setData((prev) => ({
            ...prev,
            color
        }));
    };

    return (
        <div id='outside-modal' onClick={handleClick} className='appear fixed inset-0 z-10 h-full w-full bg-black/40'>
            <div
                className='fixed left-1/2 top-1/2 flex h-fit max-h-[90vh] min-h-10 w-max min-w-10 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl px-16 pb-20'
                style={{ backgroundColor: colors('TODO', data.color) }}>
                <div className='ml-auto flex h-24 items-center'>
                    <button id='close-modal' onClick={closeModal} className='shadow-hover mt-12 p-2'>
                        <MdClose className='h-8 w-8' />
                    </button>
                </div>
                <input
                    name='title'
                    placeholder='Title'
                    className='w-full text-3xl font-bold placeholder:font-semibold focus-visible:outline-none'
                    style={{ backgroundColor: colors('TODO', data.color) }}
                    maxLength={50}
                    spellCheck={false}
                    onChange={handleChange}
                    value={data.title}
                    autoComplete='off'
                />
                <textarea
                    name='content'
                    style={{ backgroundColor: colors('TODO', data.color) }}
                    className='my-4 w-full resize-none pr-3 text-lg focus-visible:outline-none'
                    rows={9}
                    placeholder='Write a todo...'
                    maxLength={500}
                    onChange={handleChange}
                    value={data.content}
                    autoComplete='off'
                />
                <div className='mt-4 flex items-center justify-between gap-4'>
                    <div>
                        <button onClick={handleAddList} className={ListClassName}>
                            <FaPlus className='h-4 w-4 text-black/80' />
                            <p className='text-md font-semibold text-black/80'>Add To List</p>
                        </button>
                    </div>
                    <div className='flex items-center gap-4'>
                        <SelectColor scope='TODO' handleSelection={handleColorChange} />
                        <button onClick={handleConfirm} className='shadow-hover p-2'>
                            <FaCheck className='h-6 w-6' />
                        </button>
                    </div>
                </div>
                <div className='mt-2 flex items-center gap-4'>
                    <button onClick={handleAddTag} className={TagClassName + ' border-2 border-zinc-800/30'}>
                        + Add Tag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTodoModal;
