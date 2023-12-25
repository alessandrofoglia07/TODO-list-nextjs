'use client';

import { Tag as TagT } from '@prisma/client';
import Tag from '@/components/tag';
import { useState } from 'react';

const DEFAULT_TAGS_PER_PAGE = parseInt(process.env.DEFAULT_TAGS_PER_PAGE || '7');

interface Props {
    tags: TagT[];
}

const Tags = ({ tags }: Props) => {
    const [seeAll, setSeeAll] = useState(false);

    return (
        <>
            {(seeAll ? tags : tags.slice(0, DEFAULT_TAGS_PER_PAGE)).map((tag) => (
                <Tag key={tag.id} tag={tag} />
            ))}
            {!seeAll && tags.length > DEFAULT_TAGS_PER_PAGE && (
                <button onClick={() => setSeeAll(true)} className='shadow-hover flex h-10 w-2/3 items-center justify-center rounded-md bg-zinc-100 py-2 font-semibold text-zinc-600'>
                    <span className='text-sm'>See all tags</span>
                </button>
            )}
        </>
    );
};

export default Tags;
