'use client';

import { FaPlus } from 'react-icons/fa6';
import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';

const NewTodoBtn = () => {
    const { openModal } = useContext(ModalContext)!;

    const handleClick = () => {
        openModal('createTodo');
    };

    return (
        <button onClick={handleClick} className='shadow-hover grid h-72 w-72 place-items-center rounded-xl bg-slate-100'>
            <FaPlus className='h-16 w-16' />
        </button>
    );
};

export default NewTodoBtn;
