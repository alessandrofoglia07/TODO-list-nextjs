'use client';

import { ModalContext } from '@/context/modalContext';
import { Tag as TagT } from '@prisma/client';
import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

interface Props {
    tag: TagT;
    modifiable?: boolean;
    hovering: boolean;
}

const ButtonTagClassname = 'w-8 h-8 p-1 rounded-lg text-[#686868] hover:bg-black/10 transition-all';

const Content = ({ tag, modifiable }: Props) => {
    const { openModal } = useContext(ModalContext)!;

    const handleDelete = () => {
        openModal('deleteTag', { name: tag.name, id: tag.id });
    };

    const handleClose = (id: string) => {
        document.getElementById('little-tag-btn-' + id)?.classList.add('bg-shrink');
        setTimeout(() => {
            document.getElementById('little-tag-btn-' + id)?.classList.remove('bg-shrink');
        }, 200);
    };

    const handleHover = (id: string) => {
        document.getElementById('little-tag-btn-' + id)?.classList.remove('bg-shrink');
        document.getElementById('little-tag-btn-' + id)?.classList.add('bg-grow');
    };

    return (
        <div className='flex w-full items-center'>
            <p className='w-[calc(100%-64px)] break-words'>{tag.name}</p>
            {modifiable && (
                <div className='z-10 flex w-12 items-center gap-1 pl-1'>
                    <button id='little-tag-btn-1' onMouseEnter={() => handleHover('1')} onMouseLeave={() => handleClose('1')} className={ButtonTagClassname + ' !right-12'}>
                        <MdModeEdit className='h-6 w-6' />
                    </button>
                    <button id='little-tag-btn-2' onMouseEnter={() => handleHover('2')} onMouseLeave={() => handleClose('2')} className={ButtonTagClassname} onClick={handleDelete}>
                        <IoClose className='h-6 w-6' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Content;
