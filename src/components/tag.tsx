import { colors } from '@/lib/colors';
import { Tag as TagT } from '@prisma/client';
import Link from 'next/link';

interface Props {
    tag: TagT;
    button?: boolean;
    onClick?: (tag: TagT) => void;
}

export const TagClassName = 'w-fit rounded-xl px-4 py-2 font-bold text-black/80 shadow-hover border-2 border-black/20';

const Tag = ({ tag, button, onClick = (_tag: TagT) => {} }: Props) => {
    if (!button) {
        return (
            <Link
                href={`/?${new URLSearchParams({
                    tag: tag.name
                })}`}
                className={TagClassName}
                style={{ backgroundColor: colors('TAG', tag.color) }}>
                {tag.name}
            </Link>
        );
    } else {
        return (
            <button id={`tag-btn-${tag.id}`} onClick={() => onClick(tag)} className={TagClassName} style={{ backgroundColor: colors('TAG', tag.color) }}>
                {tag.name}
            </button>
        );
    }
};

export default Tag;
