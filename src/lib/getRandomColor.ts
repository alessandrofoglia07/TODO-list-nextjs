import { Color } from '@prisma/client';

export const getRandomColor = () => {
    const colors: Color[] = ['BLUE', 'GREEN', 'ORANGE', 'PURPLE', 'RED', 'YELLOW'];
    return colors[Math.floor(Math.random() * colors.length)];
};
