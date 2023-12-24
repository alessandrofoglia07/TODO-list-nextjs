'use client';

import { ModalContext } from '@/context/modalContext';
import { Color } from '@prisma/client';
import { useContext, useState, MouseEvent } from 'react';
import { z } from 'zod';
import SelectColor from '../selectColor';
import { FaCheck } from 'react-icons/fa';
import { getRandomColor } from '@/lib/getRandomColor';
import { colors } from '@/lib/colors';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const schema = z.object({
    name: z.string().min(1, 'List name required').max(20, 'List name too long'),
    color: z.nativeEnum(Color)
});

type Schema = z.infer<typeof schema>;

const AddListModal = () => {
    const router = useRouter();
    const { closeModal } = useContext(ModalContext)!;
    const [data, setData] = useState<Schema>({
        name: '',
        color: getRandomColor()
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            closeModal();
        }
    };

    const handleConfirm = async () => {
        try {
            setError(null);

            const validate = schema.safeParse(data);
            if (!validate.success) return setError(validate.error.errors[0].message);

            await axios.post('/api/lists', data);

            router.refresh();

            closeModal();
        } catch (err) {
            setError('Something went wrong');
        }
    };

    const handleColorChange = (color: Color) => {
        setData((prev) => ({
            ...prev,
            color
        }));
    };

    return (
        <div id='outside-modal' onClick={handleClick} className='appear fixed inset-0 z-10 h-full w-full bg-black/40'>
            <div className='fixed left-1/2 top-1/2 flex h-fit max-h-[90vh] min-h-10 w-max min-w-10 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white px-16 pb-20'>
                <div className='ml-auto flex h-24 items-center'>
                    <button id='close-modal' onClick={closeModal} className='shadow-hover mt-12 p-2'>
                        <MdClose className='h-8 w-8' />
                    </button>
                </div>
                <h2 className='mb-4 text-2xl font-semibold'>New List</h2>
                <div className='flex items-center'>
                    <div className='ml-1 mr-3 aspect-square h-4 rounded-md' style={{ backgroundColor: colors('LIST', data.color) }} />
                    <input
                        name='name'
                        placeholder='Name'
                        className='w-full text-3xl font-bold placeholder:font-semibold focus-visible:outline-none'
                        maxLength={20}
                        spellCheck={false}
                        onChange={handleChange}
                        value={data.name}
                        autoComplete='off'
                    />
                </div>
                <div className='mt-4 flex items-center justify-between gap-4'>
                    <p className='text-red-700'>{error}</p>
                    <div className='flex items-center gap-4'>
                        <SelectColor scope='LIST' handleSelection={handleColorChange} />
                        <button onClick={handleConfirm} className='shadow-hover p-2'>
                            <FaCheck className='h-6 w-6' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListModal;
