import { MdMenu } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { currentProfile } from '@/lib/currentProfile';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { UserButton } from '@clerk/nextjs';
import NewTagBtn from '../defaultButtons/newTagBtn';
import NewListBtn from '../defaultButtons/newListBtn';
import Tags from './tags';
import Lists from './lists';

const Navbar = async () => {
    const user = await currentProfile();

    if (!user) {
        return redirect('/');
    }

    const lists = await db.list.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const tags = await db.tag.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div id='Navbar' className='fixed flex h-full w-[25vw] flex-col items-center px-6 py-8'>
            <div className='relative h-full w-full rounded-2xl bg-slate-100 px-8 py-8'>
                <header className='flex justify-between'>
                    <h3 className='text-2xl font-bold tracking-wide text-black/80'>Menu</h3>
                    <button>
                        <MdMenu className='h-8 w-8 text-zinc-600' />
                    </button>
                </header>
                <div id='searchbar' className='mt-6 flex items-center rounded-md bg-[#EDEDED] px-2'>
                    <IoMdSearch className='h-6 w-6 text-gray-500' />
                    <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder='Search'
                        autoComplete='off'
                        spellCheck='false'
                        className='h-10 w-full rounded-lg bg-[#EDEDED] px-4 placeholder:font-semibold placeholder:text-gray-500 focus-visible:outline-none'
                    />
                </div>
                <div id='lists' className='mt-10 w-full'>
                    <h4 className='text-md pb-2 font-extrabold uppercase text-[#686868]'>Lists</h4>
                    <div className='flex max-h-[25vh] w-full flex-col gap-2 overflow-auto'>
                        <NewListBtn />
                        <Lists lists={lists} />
                    </div>
                </div>
                <div id='tags' className='mt-10 w-full'>
                    <h4 className='text-md pb-2 font-extrabold uppercase text-[#686868]'>Tags</h4>
                    <div className='flex h-fit max-h-[25vh] flex-wrap gap-2 overflow-auto'>
                        <NewTagBtn />
                        <Tags tags={tags} />
                    </div>
                </div>
                <div className='absolute bottom-8 w-full'>
                    <UserButton
                        afterSignOutUrl='/'
                        appearance={{
                            elements: {
                                avatarBox: 'h-12 w-12',
                                card: 'bg-slate-200'
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
