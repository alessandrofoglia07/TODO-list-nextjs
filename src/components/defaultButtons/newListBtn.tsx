'use client';

import { FaPlus } from 'react-icons/fa6';
import { ListClassName } from '@/components/list';
import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';

const NewListBtn = () => {
    const { openModal } = useContext(ModalContext)!;

    const handleClick = () => {
        openModal('addList');
    };
    return (
        <button onClick={handleClick} className={ListClassName}>
            <FaPlus className='h-6 w-6 text-[#838383]' />
            <p className='text-md font-semibold text-[#686868]'>Add New List</p>
        </button>
    );
};

export default NewListBtn;
