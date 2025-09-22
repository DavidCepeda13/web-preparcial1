// store/useAuthorStore.ts
import { create } from 'zustand';
import { Author } from '../types/Author';

interface AuthorState {
    authors: Author[];
    favoriteAuthors: Author[];
    loading: boolean;
    error: string | null;
    fetchAuthors: () => void;
    getAuthorById: (name: string) => Author | undefined;
    addAuthor: (newAuthor: Author) => void;
    updateAuthor: (updatedAuthor: Author) => void;
    removeAuthor: (authorToRemove: Author) => void;
    addFavoriteAuthor: (author: Author) => void;
    removeFavoriteAuthor: (authorToRemove: Author) => void;
}

const useAuthorStore = create<AuthorState>((set, get) => ({
  authors: [],
  favoriteAuthors: [],
  loading: true,
  error: null,

  fetchAuthors: async () => {
    const state = get();
    if (state.authors.length > 0) return;

    set({ loading: true, error: null });
    try {
      const response = await fetch("http://127.0.0.1:8080/api/authors");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      set({ authors: data, loading: false });
    } catch (error: Error | unknown) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addFavoriteAuthor: (author: Author) => {
    set((state) => ({
      favoriteAuthors: [...state.favoriteAuthors, author],
    }));
  },

  removeFavoriteAuthor: (authorToRemove: Author) => {
    set((state) => ({
      favoriteAuthors: state.favoriteAuthors.filter(
        (author) => author.name !== authorToRemove.name
      ),
    }));
  },

  getAuthorById: (name: string) => {
    const state = get();
    return state.authors.find((author) => author.name === name);
  },

  addAuthor: (newAuthor) => {
    set((state) => {
      newAuthor.id = state.authors.length + 1;
      return {
        authors: [...state.authors, newAuthor],
      };
    });
  },

  updateAuthor: (updatedAuthor) =>
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      ),
    })),

  removeAuthor: (authorToRemove) =>
    set((state) => ({
      authors: state.authors.filter(
        (author) => author.name !== authorToRemove.name
      ),
    })),
}));

export default useAuthorStore;