'use client';

import { ModalContext } from '@/context/modalContext';
import { colors } from '@/lib/colors';
import { Todo as TodoT } from '@prisma/client';
import { useContext } from 'react';

export type PartialTodo = Pick<TodoT, 'title' | 'color' | 'content' | 'id'> & Partial<TodoT>;

interface Props {
    todo: PartialTodo;
}

const Todo = ({ todo }: Props) => {
    const { openModal } = useContext(ModalContext)!;

    const handleClick = () => {
        openModal('editTodo', todo);
    };

    return (
        <div className='shadow-hover h-72 w-72 cursor-pointer rounded-xl bg-slate-300 p-6' style={{ backgroundColor: colors('TODO', todo.color) }} onClick={handleClick}>
            <h4 className='line-clamp-2 overflow-hidden text-ellipsis break-words py-1 text-xl font-bold'>{todo.title}</h4>
            <p className='line-clamp-[8] overflow-hidden text-ellipsis whitespace-pre-line break-words py-1 text-sm tracking-wide'>{todo.content}</p>
        </div>
    );
};

export default Todo;
