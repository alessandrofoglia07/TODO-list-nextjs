'use client';

import { List as ListT } from '@prisma/client';
import List from '@/components/list';
import { useState } from 'react';

const DEFAULT_LIST_NUMBER = parseInt(process.env.DEFAULT_LIST_NUMBER || '3');

interface Props {
    lists: ListT[];
}

const Lists = ({ lists }: Props) => {
    const [seeAll, setSeeAll] = useState(false);

    return (
        <>
            {(seeAll ? lists : lists.slice(0, DEFAULT_LIST_NUMBER)).map((list) => (
                <List key={list.id} list={list} />
            ))}
            {!seeAll && lists.length > DEFAULT_LIST_NUMBER && (
                <button onClick={() => setSeeAll(true)} className='shadow-hover flex h-10 w-2/3 items-center justify-center rounded-md bg-zinc-100 py-2 font-semibold text-zinc-600'>
                    <span className='text-sm'>See all lists</span>
                </button>
            )}
        </>
    );
};

export default Lists;
