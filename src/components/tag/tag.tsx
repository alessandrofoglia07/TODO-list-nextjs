'use client';

import { colors } from '@/lib/colors';
import { Tag as TagT } from '@prisma/client';
import Link from 'next/link';
import Content from './tagContent';
import { useState } from 'react';

interface Props {
    tag: TagT;
    button?: boolean;
    onClick?: (tag: TagT) => void;
    modifiable?: boolean;
    className?: string;
}

export const TagClassName = 'w-fit rounded-xl max-w-full px-4 py-2 font-bold text-black/80 shadow-hover border-2 border-black/20';

const Tag = ({ tag, button, onClick = (_tag: TagT) => {}, modifiable, className }: Props) => {
    const [hovering, setHovering] = useState(false);

    if (!button) {
        return (
            <Link
                href={`/?${new URLSearchParams({
                    tag: tag.name,
                    id: tag.id
                })}`}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={TagClassName + (className ? ' ' + className : '')}
                style={{ backgroundColor: colors('TAG', tag.color) }}>
                <Content tag={tag} modifiable={modifiable} hovering={hovering} />
            </Link>
        );
    } else {
        return (
            <button
                id={`tag-btn-${tag.id}`}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => onClick(tag)}
                className={TagClassName + (className ? ' ' + className : '')}
                style={{ backgroundColor: colors('TAG', tag.color) }}>
                <Content tag={tag} modifiable={modifiable} hovering={hovering} />
            </button>
        );
    }
};

export default Tag;
