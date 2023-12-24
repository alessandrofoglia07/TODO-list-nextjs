export type UnkObj = Record<string, unknown>;

export type SearchParams = Record<string, string | string[] | undefined>;

export type ModalName = 'createTodo' | 'editTodo' | 'deleteTodo' | 'addTag' | 'addList';

export interface ModalContextType {
    modalName: string | null;
    openModal: (name: ModalName) => void;
    closeModal: () => void;
}