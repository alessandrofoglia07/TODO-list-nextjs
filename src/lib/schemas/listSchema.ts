import { Color } from '@prisma/client';
import { z } from 'zod';

export const listSchema = z.object({
    name: z.string().min(1, 'List name required').max(20, 'List name too long'),
    color: z.nativeEnum(Color)
});

export type ListSchema = z.infer<typeof listSchema>;
