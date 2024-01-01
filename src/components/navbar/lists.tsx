'use client';

import { List as ListT } from '@prisma/client';
import List from '@/components/list/list';
import { useState } from 'react';

const DEFAULT_LIST_NUMBER = parseInt(process.env.DEFAULT_LIST_NUMBER || '3');

interface Props {
    lists: ListT[];
    listsAs?: 'button' | 'link';
    onClick?: (list: ListT) => void;
    modifiable?: boolean;
    listNumber?: number;
    showAllId?: string;
}

const Lists = ({ lists, modifiable, listNumber, showAllId, listsAs = 'link', onClick }: Props) => {
    const [seeAll, setSeeAll] = useState(false);

    const handleShowAll = () => {
        setTimeout(() => {
            setSeeAll(true);
        }, 0);
    };

    return (
        <>
            {(seeAll ? lists : lists.slice(0, listNumber || DEFAULT_LIST_NUMBER)).map((list) => (
                <List button={listsAs === 'button'} onClick={listsAs === 'button' ? onClick : undefined} modifiable={modifiable} key={list.id} list={list} />
            ))}
            {!seeAll && lists.length > DEFAULT_LIST_NUMBER && (
                <button
                    id={showAllId}
                    onClick={handleShowAll}
                    className='shadow-hover flex h-10 w-2/3 items-center justify-center rounded-md bg-zinc-100 py-2 font-semibold text-zinc-600'>
                    <span className='text-sm'>See all lists</span>
                </button>
            )}
        </>
    );
};

export default Lists;
