'use client';

import { ModalContext } from '@/context/modalContext';
import { colors } from '@/lib/colors';
import { List as ListT } from '@prisma/client';
import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

interface Props {
    list: ListT;
    hovering: boolean;
    modifiable?: boolean;
}

const ButtonListClassname = 'bg-radial-gradient p-1 absolute right-2 rounded-lg text-[#686868] transition-all';

const Content = ({ list, hovering, modifiable }: Props) => {
    const { openModal } = useContext(ModalContext)!;

    const handleDelete = () => {
        openModal('deleteList', { id: list.id, name: list.name });
    };

    const handleEdit = () => {
        openModal('editList', { id: list.id, name: list.name, color: list.color });
    };

    const handleClose = (id: string) => {
        document.getElementById('little-list-btn-' + id)?.classList.add('bg-shrink');
        setTimeout(() => {
            document.getElementById('little-list-btn-' + id)?.classList.remove('bg-shrink');
        }, 200);
    };

    const handleHover = (id: string) => {
        document.getElementById('little-list-btn-' + id)?.classList.remove('bg-shrink');
        document.getElementById('little-list-btn-' + id)?.classList.add('bg-grow');
    };

    return (
        <>
            <div className='mx-1 aspect-square h-4 rounded-md' style={{ backgroundColor: colors('LIST', list.color) }} />
            <p className='text-md w-full break-words font-semibold text-[#686868]'>{list.name}</p>
            {modifiable && hovering && (
                <>
                    <button
                        id='little-list-btn-1'
                        onMouseEnter={() => handleHover('1')}
                        onMouseLeave={() => handleClose('1')}
                        className={ButtonListClassname + ' !right-12'}
                        onClick={handleEdit}>
                        <MdModeEdit className='h-6 w-6' />
                    </button>
                    <button id='little-list-btn-2' onMouseEnter={() => handleHover('2')} onMouseLeave={() => handleClose('2')} className={ButtonListClassname} onClick={handleDelete}>
                        <IoClose className='h-6 w-6' />
                    </button>
                </>
            )}
        </>
    );
};

export default Content;
