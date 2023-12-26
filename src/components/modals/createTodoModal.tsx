'use client';

import { ModalContext } from '@/context/modalContext';
import { useContext, type MouseEvent as MouseEventReact, useState, useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import SelectColor from '@/components/selectColor';
import { colors } from '@/lib/colors';
import { Color, Tag as TagT, List as ListT } from '@prisma/client';
import { FaCheck, FaPlus } from 'react-icons/fa';
import List, { ListClassName } from '../list';
import Tag, { TagClassName } from '../tag';
import { z } from 'zod';
import { getRandomColor } from '@/lib/getRandomColor';
import axios from 'axios';
import Lists from '../navbar/lists';

const schema = z.object({
    title: z.string().min(1, 'Title required').max(50, 'Title too long'),
    content: z.string().min(1, 'Content required').max(500, 'Content too long'),
    color: z.nativeEnum(Color)
});

type Schema = z.infer<typeof schema> & {
    lists: ListT[];
    tags: TagT[];
};

const CreateTodoModal = () => {
    const { closeModal } = useContext(ModalContext)!;
    const [data, setData] = useState<Schema>({
        title: '',
        content: '',
        color: getRandomColor(),
        lists: [],
        tags: []
    });
    const [lists, setLists] = useState<ListT[]>([]);
    const [tags, setTags] = useState<TagT[]>([]);
    const [selecting, setSelecting] = useState<'list' | 'tag' | null>(null);

    const fetchLists = async () => {
        const res = await axios.get('/api/lists');
        setLists(res.data);
    };

    const fetchTags = async () => {
        const res = await axios.get('/api/tags');
        setTags(res.data);
    };

    useEffect(() => {
        fetchLists();
        fetchTags();
    }, []);

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
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = (e: MouseEventReact<HTMLElement>) => {
        if (e.target === document.getElementById('outside-modal')) {
            handleConfirm();
            closeModal();
        }
    };

    // TODO
    const handleConfirm = () => {};

    const handleListSelect = (list: ListT) => {
        if (data.lists.find((l) => l.id === list.id)) return;
        setData((prev) => ({
            ...prev,
            lists: [...prev.lists, list]
        }));
        handleClose();
    };

    const handleListRemove = (list: ListT) => {
        setData((prev) => ({
            ...prev,
            lists: prev.lists.filter((l) => l.id !== list.id)
        }));
    };

    const handleTagSelect = (tag: TagT) => {
        if (data.tags.find((t) => t.id === tag.id)) return;
        setData((prev) => ({
            ...prev,
            tags: [...prev.tags, tag]
        }));
        handleClose();
    };

    const handleTagRemove = (tag: TagT) => {
        document.getElementById(`tag-btn-${tag.id}`)?.classList.add('bubble-disappear');
        setTimeout(() => {
            setData((prev) => ({
                ...prev,
                tags: prev.tags.filter((t) => t.id !== tag.id)
            }));
        }, 200);
    };

    const handleColorChange = (color: Color) => {
        setData((prev) => ({
            ...prev,
            color
        }));
    };

    return (
        <div id='outside-modal' onClick={handleClick} className='appear fixed inset-0 z-10 h-full w-full bg-black/40'>
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
                    value={data.title}
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
                <div className='mt-4 flex items-center justify-between gap-4'>
                    <div className='relative'>
                        <button onClick={() => setSelecting('list')} className={ListClassName}>
                            <FaPlus className='h-4 w-4 text-black/80' />
                            <p className='text-md font-semibold text-black/80'>Add To List</p>
                        </button>
                        {selecting === 'list' && (
                            <div id='list-menu' className='bubble-appear absolute bottom-0 left-0 z-20 mb-12 rounded-3xl bg-slate-50 px-4 py-2'>
                                <div id='list-menu-content' className='max-w-70vw w-max'>
                                    <Lists listsAs='button' onClick={handleListSelect} showAllId='see-all-lists-btn' lists={lists} listNumber={5} />
                                </div>
                            </div>
                        )}
                        {data.lists.length > 0 && (
                            <div className='flex max-h-[20vh] flex-col gap-2 overflow-auto'>
                                {data.lists.map((list) => (
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
                                {tags.map((tag) => (
                                    <Tag button onClick={handleTagSelect} key={tag.id} tag={tag} />
                                ))}
                            </div>
                        </div>
                    )}
                    {data.tags.length > 0 && (
                        <div className='max-h-[20vh] overflow-y-auto'>
                            {data.tags.map((tag) => (
                                <Tag button onClick={handleTagRemove} key={tag.id} tag={tag} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTodoModal;
