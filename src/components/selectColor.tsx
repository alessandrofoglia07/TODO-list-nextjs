'use client';

import { colors } from '@/lib/colors';
import { Color } from '@prisma/client';
import { useState, useEffect } from 'react';
import { IoColorPalette } from 'react-icons/io5';

interface Props {
    handleSelection: (color: Color) => void;
    scope?: 'TODO' | 'TAG' | 'LIST';
}

const SelectColor = ({ handleSelection, scope = 'TODO' }: Props) => {
    const [selecting, setSelecting] = useState(false);
    const [canSelect, setCanSelect] = useState(false);

    const handleClose = () => {
        setCanSelect(false);
        document.getElementById('color-menu')?.classList.add('bubble-disappear');
        setTimeout(() => {
            setSelecting(false);
        }, 200);
    };

    const handleSelect = (color: Color) => {
        if (!canSelect) return;
        handleSelection(color);
        handleClose();
    };

    const handleClick = () => {
        if (!selecting) {
            setSelecting(true);
            setTimeout(() => {
                setCanSelect(true);
            }, 200);
        }
    };

    useEffect(() => {
        if (selecting) {
            const handleClick = (e: MouseEvent) => {
                if (e.target === document.getElementById('color-menu') || e.target === document.getElementById('color-menu-content')) return;
                handleClose();
            };

            document.addEventListener('click', handleClick);

            return () => document.removeEventListener('click', handleClick);
        }
    }, [selecting]);

    return (
        <div className='relative'>
            <button onClick={handleClick} className='shadow-hover p-2'>
                <IoColorPalette className='h-6 w-6' />
            </button>
            {selecting && (
                <div id='color-menu' className='bubble-appear absolute bottom-0 right-0 mb-12 rounded-3xl bg-slate-100 px-4 py-2'>
                    <div id='color-menu-content' className='flex w-max flex-wrap gap-2'>
                        {Object.keys(Color).map((color) => (
                            <button
                                key={color}
                                onClick={() => handleSelect(color as keyof typeof Color)}
                                className='h-8 w-8 rounded-full'
                                style={{ backgroundColor: colors(scope, color as keyof typeof Color) }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectColor;
