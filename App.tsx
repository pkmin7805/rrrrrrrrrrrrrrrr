import React, { useState, useEffect, useCallback } from 'react';
import { fetchBookRecommendations } from './services/gemini';
import { Book, SearchState } from './types';
import { BookCard } from './components/BookCard';
import { SearchBar } from './components/SearchBar';
import { APP_NAME, INITIAL_PROMPT } from './constants';

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: [],
    error: null,
  });

  const loadBooks = useCallback(async (query: string) => {
    setState(prev => ({ ...prev, isSearching: true, error: null, query }));
    try {
      const books = await fetchBookRecommendations(query);
      setState(prev => ({ ...prev, results: books, isSearching: false }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        isSearching: false, 
        error: "책을 불러오는 데 문제가 발생했습니다. 다시 시도해 주세요." 
      }));
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadBooks(INITIAL_PROMPT);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (query: string) => {
    const prompt = `Recommend 6 books based on this request: "${query}". Return valid JSON.`;
    loadBooks(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-ink">
            <div className="bg-ink text-white p-1.5 rounded-md">
              <BookIcon />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight">{APP_NAME}</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-accent transition-colors">베스트셀러</a>
            <a href="#" className="hover:text-accent transition-colors">신간 도서</a>
            <a href="#" className="hover:text-accent transition-colors">이벤트</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero / Search Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            당신만을 위한 <br className="hidden sm:block" />
            <span className="text-accent">특별한 책</span>을 찾아보세요
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            AI 큐레이터가 당신의 취향과 기분을 분석하여 <br/>
            지금 읽기 가장 좋은 책을 추천해 드립니다.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={state.isSearching} />
        </section>

        {/* Results Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
              {state.isSearching ? '책을 찾고 있습니다...' : '추천 도서'}
            </h3>
            {!state.isSearching && state.results.length > 0 && (
               <button 
                onClick={() => handleSearch(state.query || INITIAL_PROMPT)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-accent transition-colors"
               >
                 <RefreshIcon className="w-4 h-4" />
                 다시 추천받기
               </button>
            )}
          </div>

          {state.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center my-8">
              {state.error}
            </div>
          )}

          {state.isSearching ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col space-y-4">
                    <div className="bg-gray-200 aspect-[2/3] rounded-sm w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
             </div>
          ) : (
            <>
              {state.results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {state.results.map((book, index) => (
                    <BookCard key={`${book.title}-${index}`} book={book} index={index} />
                  ))}
                </div>
              ) : (
                !state.error && (
                  <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-400">검색 결과가 없습니다.</p>
                  </div>
                )
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="flex justify-center items-center gap-2 mb-4 text-ink font-serif font-bold">
              <BookIcon />
              <span>{APP_NAME}</span>
           </div>
           <p className="text-gray-400 text-sm">
             © 2024 My AI Bookstore. Powered by Google Gemini.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
