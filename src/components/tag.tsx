import { colors } from '@/lib/colors';
import { Tag as TagT } from '@prisma/client';
import Link from 'next/link';

interface Props {
    tag: Pick<TagT, 'name' | 'color'> & Partial<TagT>;
}

export const TagClassName =
    'relative w-fit rounded-xl bg-gray-200 px-4 py-2 font-bold text-black/80 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:rounded-xl before:bg-black before:opacity-0 before:transition-opacity hover:before:opacity-10';

const Tag = ({ tag }: Props) => {
    return (
        <Link
            href={`/?${new URLSearchParams({
                tag: tag.name
            })}`}
            className={TagClassName}
            style={{ backgroundColor: colors('TAG', tag.color) + ' !important' }}>
            {tag.name}
        </Link>
    );
};

export default Tag;
