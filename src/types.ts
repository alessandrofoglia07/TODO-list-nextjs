export type UnkObj = Record<string, unknown>;

export type SearchParams = Record<string, string | string[] | undefined>;

export type ModalName = 'createTodo' | 'addTag' | 'addList' | 'deleteList' | 'deleteTag' | 'editList' | 'editTag' | 'editTodo';

export interface ModalContextType {
    modalName: string | null;
    openModal: (name: ModalName, data?: UnkObj) => void;
    closeModal: () => void;
}

export type Scope = 'TODO' | 'LIST' | 'TAG';