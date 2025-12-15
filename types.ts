export interface Book {
  title: string;
  author: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  isbn?: string; // Optional, used for key generation if available
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Book[];
  error: string | null;
}