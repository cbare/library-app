import { createContext, FC, useContext } from 'react';
import { Book } from '../models/LibraryModels';
import {
  books as books_,
  authors as authors_,
  authors_by_slug as authors_by_slug_,
  AuthorEntry,
  categories as categories_,
  categories_by_slug as categories_by_slug_,
  publishers_by_slug as publishers_by_slug_,
} from '../bookData'


interface LibraryStore {
  books: Book[];
  authors: AuthorEntry[];
  authors_by_slug: Map<string, AuthorEntry>;
  categories: string[];
  categories_by_slug: Map<string, string>;
  publishers_by_slug: Map<string, string>;
  getBookByIsbn: (isbn: string) => Book | undefined;
  isEmpty: boolean;
}

const LibraryStoreContext = createContext<LibraryStore | undefined>(undefined);

export const useLibraryStore = () => {
  const context = useContext(LibraryStoreContext);

  if (!context) {
    throw new Error('useLibraryStore must be used within LibraryStoreProvider');
  }

  return context;
};

export const LibraryStoreProvider: FC = ({ children }) => {
  const books = books_
  const authors = authors_
  const authors_by_slug = authors_by_slug_
  const categories = categories_
  const categories_by_slug = categories_by_slug_
  const publishers_by_slug = publishers_by_slug_
  const getBookByIsbn = (isbn: string) => books.find(b => b.isbn === isbn)
  const isEmpty = books.length === 0

  return (
    <LibraryStoreContext.Provider value={
      {
        books,
        authors,
        authors_by_slug,
        categories,
        categories_by_slug,
        publishers_by_slug,
        getBookByIsbn,
        isEmpty, 
      }}>
      {children}
    </LibraryStoreContext.Provider>
  )
}
