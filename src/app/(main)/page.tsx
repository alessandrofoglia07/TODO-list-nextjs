import Todo from '@/components/todo';
import { db } from '@/lib/db';
import { getQuery } from '@/lib/getQuery';
import { initialProfile } from '@/lib/initialProfile';
import { shadowHover } from '@/lib/shadowHover';
import { SearchParams } from '@/types';
import { FaPlus } from 'react-icons/fa6';

interface Props {
    searchParams?: SearchParams;
}

const MainPage = async ({ searchParams }: Props) => {
    const user = await initialProfile();

    const query = getQuery(searchParams, user);

    const todos = await db.todo.findMany({
        where: query
    });

    return (
        <div className='px-6 py-8'>
            <h1 className='mt-4 text-5xl font-bold'>Todo Wall</h1>
            <div id='todos' className='flex h-full w-full flex-wrap gap-6 px-8 py-16'>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
                <button className={shadowHover('grid h-72 w-72 place-items-center rounded-xl bg-slate-100')}>
                    <FaPlus className='h-16 w-16' />
                </button>
            </div>
        </div>
    );
};

export default MainPage;
