import NewTodoBtn from '@/components/defaultButtons/newTodoBtn';
import Todo from '@/components/todo';
import { db } from '@/lib/db';
import { getQuery } from '@/lib/getQuery';
import { initialProfile } from '@/lib/initialProfile';
import { SearchParams } from '@/types';

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
                <NewTodoBtn />
            </div>
        </div>
    );
};

export default MainPage;
