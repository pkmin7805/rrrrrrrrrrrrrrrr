import React, { useState } from 'react';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="오늘 어떤 책을 읽고 싶으신가요? (예: 힐링되는 따뜻한 소설)"
          disabled={isLoading}
          className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute inset-y-1 right-1 px-6 bg-ink text-white rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '탐색 중...' : '검색'}
        </button>
      </form>
      <div className="mt-3 flex justify-center gap-2 text-xs text-gray-400">
        <span>추천 키워드:</span>
        <button onClick={() => onSearch("SF classics")} className="hover:text-accent transition-colors underline decoration-dotted">SF 명작</button>
        <button onClick={() => onSearch("Comforting essays for stress")} className="hover:text-accent transition-colors underline decoration-dotted">위로가 되는 에세이</button>
        <button onClick={() => onSearch("Latest business trends")} className="hover:text-accent transition-colors underline decoration-dotted">최신 비즈니스 트렌드</button>
      </div>
    </div>
  );
};
