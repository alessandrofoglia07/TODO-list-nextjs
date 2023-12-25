'use client';

import { colors } from '@/lib/colors';
import { List as ListT } from '@prisma/client';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';

interface Props {
    list: ListT;
    button?: boolean;
    onClick?: (list: ListT) => void;
}

export const ListClassName = 'flex w-full items-center gap-3 px-2 py-2 shadow-hover';

interface ContentProps {
    list: ListT;
    hovering: boolean;
}

export const ButtonListTagClassname = 'bg-radial-gradient p-1 absolute right-2 rounded-lg text-[#686868] transition-all';

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

const Content = ({ list, hovering }: ContentProps) => (
    <>
        <div className='mx-1 aspect-square h-4 rounded-md' style={{ backgroundColor: colors('LIST', list.color) }} />
        <p className='text-md w-full break-words font-semibold text-[#686868]'>{list.name}</p>
        {hovering && (
            <>
                <button id='little-list-btn-1' onMouseEnter={() => handleHover('1')} onMouseLeave={() => handleClose('1')} className={ButtonListTagClassname + ' !right-12'}>
                    <MdModeEdit className='h-6 w-6' />
                </button>
                <button id='little-list-btn-2' onMouseEnter={() => handleHover('2')} onMouseLeave={() => handleClose('2')} className={ButtonListTagClassname}>
                    <IoClose className='h-6 w-6' />
                </button>
            </>
        )}
    </>
);

const List = ({ list, button, onClick = (_list: ListT) => {} }: Props) => {
    const [hovering, setHovering] = useState(false);

    if (!button) {
        return (
            <Link
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                href={`/?${new URLSearchParams({
                    list: list.name
                })}`}
                className={ListClassName}>
                <Content list={list} hovering={hovering} />
            </Link>
        );
    } else {
        return (
            <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={ListClassName} onClick={() => onClick(list)}>
                <Content list={list} hovering={hovering} />
            </button>
        );
    }
};

export default List;
