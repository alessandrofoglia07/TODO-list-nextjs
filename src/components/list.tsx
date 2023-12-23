import { colors } from '@/lib/colors';
import { shadowHover } from '@/lib/shadowHover';
import { List as ListT } from '@prisma/client';
import Link from 'next/link';

interface Props {
    list: Pick<ListT, 'name' | 'color'> & Partial<ListT>;
}

export const ListClassName = shadowHover('flex w-fit items-center gap-3 px-4 py-2');

const List = ({ list }: Props) => {
    return (
        <Link
            href={`/?${new URLSearchParams({
                list: list.name
            })}`}
            className={ListClassName}>
            <div className={`mx-1 h-4 w-4 rounded-md`} style={{ backgroundColor: colors('LIST', list.color) }} />
            <p className='text-md font-semibold text-[#686868]'>{list.name}</p>
        </Link>
    );
};

export default List;
