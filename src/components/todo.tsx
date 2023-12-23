import { colors } from '@/lib/colors';
import { shadowHover } from '@/lib/shadowHover';
import { Todo as TodoT } from '@prisma/client';

interface Props {
    todo: Pick<TodoT, 'title' | 'color' | 'content'> & Partial<TodoT>;
}

const Todo = ({ todo }: Props) => {
    return (
        <div className={shadowHover('h-72 w-72 cursor-pointer rounded-xl bg-slate-300 p-6')} style={{ backgroundColor: colors('TODO', todo.color) }}>
            <h4 className='line-clamp-2 overflow-hidden text-ellipsis break-words py-1 text-xl font-bold'>{todo.title}</h4>
            <p className='line-clamp-[8] overflow-hidden text-ellipsis whitespace-pre-line break-words py-1 text-sm tracking-wide'>{todo.content}</p>
        </div>
    );
};

export default Todo;
