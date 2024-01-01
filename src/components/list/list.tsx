'use client';

import { List as ListT } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import Content from './listContent';

interface Props {
    list: ListT;
    button?: boolean;
    onClick?: (list: ListT) => void;
    modifiable?: boolean;
}

export const ListClassName = 'flex w-full items-center gap-3 px-2 py-2 shadow-hover';

const List = ({ list, button, onClick = (_list: ListT) => {}, modifiable }: Props) => {
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
                <Content modifiable={modifiable} list={list} hovering={hovering} />
            </Link>
        );
    } else {
        return (
            <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={ListClassName} onClick={() => onClick(list)}>
                <Content modifiable={modifiable} list={list} hovering={hovering} />
            </button>
        );
    }
};

export default List;
