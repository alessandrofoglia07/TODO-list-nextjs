import { SearchParams, UnkObj } from '@/types';

type Query = {
    userId: string;
    lists?: UnkObj;
    tags?: UnkObj;
};

export const getQuery = (user: any, searchParams?: SearchParams) => {
    let query: Query = {
        userId: user.id
    };

    if (!searchParams) return query;

    const { list, tag } = searchParams;

    if (list) {
        query = {
            ...query,
            lists: {
                some: {
                    name: (typeof list === 'string' ? list : list[0]).toLowerCase()
                }
            }
        };
    }

    if (tag) {
        query = {
            ...query,
            tags: {
                some: {
                    name: (typeof tag === 'string' ? tag : tag[0]).toLowerCase()
                }
            }
        };
    }

    return query;
};
