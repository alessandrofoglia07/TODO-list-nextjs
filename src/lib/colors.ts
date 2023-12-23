import { Color } from '@prisma/client';

type Scope = 'LIST' | 'TODO' | 'TAG';

export const colors = (scope: Scope, color: Color) => {
    // list square color
    if (scope === 'LIST') {
        switch (color) {
            case 'BLUE':
                return '#66D9E8';
            case 'RED':
                return '#FF6B6B';
            case 'YELLOW':
                return '#FFD43B';
            case 'GREEN':
                return '#87D37C';
            case 'PURPLE':
                return '#AE81FF';
            case 'ORANGE':
                return '#FF9F43';
        }
    }

    // todo / tag bg color
    if (scope === 'TODO' || scope === 'TAG') {
        switch (color) {
            case 'BLUE':
                return '#D1EAED';
            case 'YELLOW':
                return '#FDF2B3';
            case 'RED':
                return '#FFDADA';
            case 'ORANGE':
                return '#FFD4A9';
            case 'GREEN':
                return '#D4F5D4';
            case 'PURPLE':
                return '#E9DFFF';
        }
    }

    return '#FFFFFF';
};
