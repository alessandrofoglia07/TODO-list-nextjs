'use client';

import { ModalContext } from '@/context/modalContext';
import { useContext, type MouseEvent as MouseEventReact, useState, useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import SelectColor from '@/components/selectColor';
import { colors } from '@/lib/colors';
import { Color, Tag as TagT, List as ListT, Todo } from '@prisma/client';
import { FaCheck, FaPlus } from 'react-icons/fa';
import List, { ListClassName } from '../list/list';
import Tag, { TagClassName } from '../tag/tag';
import axios from 'axios';
import Lists from '../navbar/lists';
import { todoSchema } from '@/lib/schemas/todoSchema';
import { useRouter } from 'next/navigation';

interface Props {
    id: string;
}

type SelectorListTag<T extends ListT | TagT> = {
    init: T[];
    current: T[];
};

const defaultSelector = {
    init: [],
    current: []
};

const EditTodoModal = ({ id }: Props) => {
    const router = useRouter();
    const { closeModal } = useContext(ModalContext)!;
    const [data, setData] = useState<Todo | null>(null);
    const [lists, setLists] = useState<SelectorListTag<ListT>>(defaultSelector);
    const [tags, setTags] = useState<SelectorListTag<TagT>>(defaultSelector);
    const [allLists, setAllLists] = useState<SelectorListTag<ListT>>(defaultSelector);
    const [allTags, setAllTags] = useState<SelectorListTag<TagT>>(defaultSelector);
    const [selecting, setSelecting] = useState<'list' | 'tag' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchLists = useCallback(async () => {
        const res = await axios.get(`/api/todos/${id}/lists`);
        setLists((prev) => ({ ...prev, current: res.data }));
    }, [id]);

    const fetchTags = useCallback(async () => {
        const res = await axios.get(`/api/todos/${id}/tags`);
        setTags((prev) => ({ ...prev, current: res.data }));
    }, [id]);

    const fetchTodo = useCallback(async () => {
        const res = await axios.get(`/api/todos/${id}`);
        setData(res.data);
    }, [id]);

    useEffect(() => {
        fetchTodo();
        fetchLists();
        fetchTags();
    }, [fetchTodo, fetchLists, fetchTags]);

    const fetchAllTags = useCallback(async () => {
        const res = await axios.get('/api/tags');
        setAllTags({ init: res.data, current: res.data });
    }, []);

    const fetchAllLists = useCallback(async () => {
        const res = await axios.get('/api/lists');
        setAllLists({ init: res.data, current: res.data });
    }, []);

    useEffect(() => {
        fetchAllTags();
        fetchAllLists();
    }, [fetchAllTags, fetchAllLists]);

    useEffect(() => {
        setAllTags((prev) => {
            return { ...prev, current: prev.init.filter((tag) => !tags.current.find((t) => t.id === tag.id)) };
        });
    }, [tags]);

    useEffect(() => {
        setAllLists((prev) => {
            return { ...prev, current: prev.init.filter((list) => !lists.current.find((l) => l.id === list.id)) };
        });
    }, [lists]);

    const handleClose = useCallback(() => {
        if (selecting === 'list') {
            document.getElementById('list-menu')?.classList.add('bubble-disappear');
        } else if (selecting === 'tag') {
            document.getElementById('tag-menu')?.classList.add('bubble-disappear');
        }
        setTimeout(() => {
            setSelecting(null);
        }, 200);
    }, [selecting]);

    useEffect(() => {
        if (selecting === 'list') {
            const handleClickOutside = (e: MouseEvent) => {
                if (
                    e.target === document.getElementById('list-menu') ||
                    e.target === document.getElementById('list-menu-content') ||
                    e.target === document.getElementById('see-all-lists-btn')
                )
                    return;
                handleClose();
            };

            document.addEventListener('click', handleClickOutside);

            return () => document.removeEventListener('click', handleClickOutside);
        } else if (selecting === 'tag') {
            const handleClickOutside = (e: MouseEvent) => {
                if (e.target === document.getElementById('tag-menu') || e.target === document.getElementById('tag-menu-content')) return;
                handleClose();
            };

            document.addEventListener('click', handleClickOutside);

            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [handleClose, selecting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!data) return;

        setData((prev) => {
            if (prev === null) {
                return null;
            }

            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    };

    const handleClick = (e: MouseEventReact<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            handleConfirm();
            closeModal();
        }
    };

    // TODO: Add list and tag confirmation
    const handleConfirm = async () => {
        try {
            const val = todoSchema.safeParse(data);

            if (!val.success) return setError(val.error.errors[0].message);

            await axios.patch('/api/todos', data);

            await handleListTagConfirm();

            router.refresh();

            closeModal();
        } catch (err) {
            setError('Something went wrong');
        }
    };

    const handleListTagConfirm = async () => {
        try {
            if (!data) return;

            if (JSON.stringify(lists.init) !== JSON.stringify(lists.current)) {
                await axios.patch(`/api/todos/${data.id}/lists`, lists.current);
            }

            if (JSON.stringify(tags.init) !== JSON.stringify(tags.current)) {
                await axios.patch(`/api/todos/${data.id}/tags`, tags.current);
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    const handleListSelect = (list: ListT) => {
        if (!data) return;

        if (lists.current.find((l) => l.id === list.id)) return;

        setLists((prev) => ({ ...prev, current: [...prev.current, list] }));

        handleClose();
    };

    const handleListRemove = (list: ListT) => {
        if (!data) return;

        setLists((prev) => ({ ...prev, current: prev.current.filter((l) => l.id !== list.id) }));
    };

    const handleTagSelect = (tag: TagT) => {
        if (!data) return;

        if (tags.current.find((t) => t.id === tag.id)) return;

        setTags((prev) => ({ ...prev, current: [...prev.current, tag] }));

        handleClose();
    };

    const handleTagRemove = (tag: TagT) => {
        if (!data) return;
        setTags((prev) => ({ ...prev, current: prev.current.filter((t) => t.id !== tag.id) }));
    };

    const handleColorChange = (color: Color) => {
        if (!data) return;

        setData((prev) => {
            if (prev === null) {
                return null;
            }

            return {
                ...prev,
                color
            };
        });
    };

    return (
        <div id='outside-modal' onClick={handleClick} className='appear fixed inset-0 z-10 h-full w-full bg-black/40'>
            {data ? (
                <div
                    className='fixed left-1/2 top-1/2 flex h-fit max-h-[90vh] min-h-10 w-[560px] min-w-10 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl px-16 pb-20 transition-all'
                    style={{ backgroundColor: colors('TODO', data.color) }}>
                    <div className='ml-auto flex h-24 items-center'>
                        <button id='close-modal' onClick={closeModal} className='shadow-hover mt-12 p-2'>
                            <MdClose className='h-8 w-8' />
                        </button>
                    </div>
                    <input
                        name='title'
                        placeholder='Title'
                        className='w-full text-3xl font-bold transition-colors placeholder:font-semibold focus-visible:outline-none'
                        style={{ backgroundColor: colors('TODO', data.color) }}
                        maxLength={50}
                        spellCheck={false}
                        onChange={handleChange}
                        value={data?.title}
                        autoComplete='off'
                    />
                    <textarea
                        name='content'
                        style={{ backgroundColor: colors('TODO', data.color) }}
                        className='my-4 w-full resize-none pr-3 text-lg transition-colors focus-visible:outline-none'
                        rows={9}
                        placeholder='Write a todo...'
                        maxLength={500}
                        onChange={handleChange}
                        value={data.content}
                        autoComplete='off'
                    />
                    {error && <p className='text-lg font-semibold text-red-600'>{error}</p>}
                    <div className='mt-4 flex items-center justify-between gap-4'>
                        <div className='relative w-full'>
                            <button onClick={() => setSelecting('list')} className={ListClassName}>
                                <FaPlus className='h-4 w-4 text-black/80' />
                                <p className='text-md font-semibold text-black/80'>Add To List</p>
                            </button>
                            {selecting === 'list' && (
                                <div id='list-menu' className='bubble-appear absolute bottom-0 left-0 z-20 mb-12 rounded-3xl bg-slate-50 px-4 py-2'>
                                    <div id='list-menu-content' className='max-w-70vw w-max'>
                                        <Lists listsAs='button' onClick={handleListSelect} showAllId='see-all-lists-btn' lists={allLists.current} listNumber={5} />
                                    </div>
                                </div>
                            )}
                            {lists.current.length > 0 && (
                                <div className='flex max-h-[20vh] flex-col gap-2 overflow-auto [&>*]:!w-max'>
                                    {lists.current.map((list) => (
                                        <List button onClick={handleListRemove} key={list.id} list={list} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='flex items-center gap-4'>
                            <SelectColor scope='TODO' handleSelection={handleColorChange} />
                            <button onClick={handleConfirm} className='shadow-hover p-2'>
                                <FaCheck className='h-6 w-6' />
                            </button>
                        </div>
                    </div>
                    <div className='relative mt-4 flex flex-wrap items-center gap-4'>
                        <button onClick={() => setSelecting('tag')} className={TagClassName}>
                            + Add Tag
                        </button>
                        {selecting === 'tag' && (
                            <div id='tag-menu' className='bubble-appear absolute bottom-0 left-0 z-20 mb-12 rounded-3xl bg-slate-50 px-4 py-2'>
                                <div id='tag-menu-content' className='flex w-max flex-col gap-2'>
                                    {allTags.current.map((tag) => (
                                        <Tag button onClick={handleTagSelect} key={tag.id} tag={tag} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {tags.current.length > 0 && (
                            <div className='max-h-[20vh] overflow-y-auto'>
                                {tags.current.map((tag) => (
                                    <Tag button onClick={handleTagRemove} key={tag.id} tag={tag} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default EditTodoModal;
