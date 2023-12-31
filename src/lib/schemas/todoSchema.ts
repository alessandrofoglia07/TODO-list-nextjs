import { Color, List as ListT, Tag as TagT } from '@prisma/client';
import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, 'Title required').max(50, 'Title too long'),
    content: z.string().min(1, 'Content required').max(500, 'Content too long'),
    color: z.nativeEnum(Color)
});

export type TodoSchema = z.infer<typeof todoSchema> & {
    lists: ListT[];
    tags: TagT[];
};
