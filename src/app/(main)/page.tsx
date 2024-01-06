import NewTodoBtn from '@/components/defaultButtons/newTodoBtn';
import List from '@/components/list/list';
import Tag from '@/components/tag/tag';
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

    const query = getQuery(user, searchParams);

    const todos = await db.todo.findMany({ where: query });

    const getSubtitle = async () => {
        if (searchParams && searchParams.id) {
            const init = <h4 className='font-semibold'>Search results for: </h4>;

            if (searchParams.tag) {
                const tag = await db.tag.findFirst({
                    where: {
                        name: searchParams.tag as string,
                        id: searchParams.id as string,
                        userId: user.id
                    }
                });

                if (!tag) return 'Tag not found';

                return (
                    <>
                        {init} <Tag className='cursor-default' tag={tag} />
                    </>
                );
            } else if (searchParams.list) {
                const list = await db.list.findFirst({
                    where: {
                        name: searchParams.list as string,
                        id: searchParams.id as string,
                        userId: user.id
                    }
                });

                if (!list) return 'List not found';

                return (
                    <>
                        {init} <List className='w-max cursor-default' list={list} />
                    </>
                );
            }
        }
        return 'Showing All Todos';
    };

    return (
        <div className='px-6 py-8'>
            <h1 className='mt-4 text-5xl font-bold'>Todo Wall</h1>
            <div className='mt-2 flex flex-col'>{await getSubtitle()}</div>
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
