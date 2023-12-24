'use client';

import { TagClassName } from '@/components/tag';
import { ModalContext } from '@/context/modalContext';
import { useContext } from 'react';

const NewTagBtn = () => {
    const { openModal } = useContext(ModalContext)!;

    const handleClick = () => {
        openModal('addTag');
    };
    return (
        <button onClick={handleClick} className={TagClassName + ' bg-slate-200'}>
            + Add Tag
        </button>
    );
};

export default NewTagBtn;
