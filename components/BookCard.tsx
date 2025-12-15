import React from 'react';
import { Book } from '../types';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={`w-4 h-4 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.53.044.739.676.354 1.014l-4.182 3.732a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.182-3.732c-.385-.338-.176-.97.354-1.014l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

interface BookCardProps {
  book: Book;
  index: number;
}

export const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  // Generate a deterministic image URL based on title length to keep it consistent but varied
  const seed = book.title.length + index;
  const imageUrl = `https://picsum.photos/seed/${seed}/300/450`;

  return (
    <div className="group relative flex flex-col bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200 relative">
        <img 
          src={imageUrl} 
          alt={book.title} 
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-800 rounded-sm shadow-sm">
          {book.category}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-serif font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 italic">{book.author}</p>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-0.5">
             {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.floor(book.rating)} />
             ))}
             <span className="text-xs text-gray-400 ml-1">({book.rating})</span>
          </div>
          <span className="text-sm font-semibold text-accent">{book.price}</span>
        </div>
      </div>
    </div>
  );
};
