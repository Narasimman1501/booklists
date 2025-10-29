import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { useToast } from "@/hooks/use-toast";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  ratings_average?: number;
  subject?: string[];
}

const Discover = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTrendingBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=bestseller&limit=24&sort=rating"
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchTrendingBooks();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=24`
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Discover Books</h1>
          <p className="text-muted-foreground text-lg">
            Find your next favorite read from millions of books
          </p>
        </div>
        <SearchBar onSearch={handleSearch} placeholder="Search by title, author, or ISBN..." />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-muted rounded-lg mb-2" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.key}
              id={book.key}
              title={book.title}
              author={book.author_name?.[0] || "Unknown Author"}
              coverUrl={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : undefined
              }
              rating={book.ratings_average ? Number(book.ratings_average.toFixed(1)) : undefined}
              genres={book.subject?.slice(0, 2)}
            />
          ))}
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No books found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default Discover;
