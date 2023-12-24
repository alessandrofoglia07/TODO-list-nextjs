import { colors } from '@/lib/colors';
import { List as ListT } from '@prisma/client';
import Link from 'next/link';

interface Props {
    list: ListT;
    button?: boolean;
    onClick?: (list: ListT) => void;
}

export const ListClassName = 'flex w-fit items-center gap-3 px-4 py-2 shadow-hover';

const List = ({ list, button, onClick = (_list: ListT) => {} }: Props) => {
    if (!button) {
        return (
            <Link
                href={`/?${new URLSearchParams({
                    list: list.name
                })}`}
                className={ListClassName}>
                <div className='mx-1 h-4 w-4 rounded-md' style={{ backgroundColor: colors('LIST', list.color) }} />
                <p className='text-md font-semibold text-[#686868]'>{list.name}</p>
            </Link>
        );
    } else {
        return (
            <button className={ListClassName} onClick={() => onClick(list)}>
                <div className='mx-1 h-4 w-4 rounded-md' style={{ backgroundColor: colors('LIST', list.color) }} />
                <p className='text-md font-semibold text-[#686868]'>{list.name}</p>
            </button>
        );
    }
};

export default List;
