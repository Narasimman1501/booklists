import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Get state from URL or use defaults
  const sortBy = searchParams.get("sort") || "rating";
  const genre = searchParams.get("genre") || "all";
  const searchQuery = searchParams.get("q") || "";
  
  const { toast } = useToast();

  const fetchBooks = async (query: string = "", selectedGenre: string = "all", sort: string = "rating") => {
    setLoading(true);
    try {
      let searchTerm = query || "fiction";
      
      // Use better search terms for different scenarios
      if (!query) {
        // When no search query, use popular terms that return books with covers
        switch (sort) {
          case "new":
            searchTerm = "fiction has_fulltext:true";
            break;
          case "old":
            searchTerm = "classic literature";
            break;
          case "title":
            searchTerm = "bestseller";
            break;
          default:
            searchTerm = "bestseller";
        }
      }
      
      if (selectedGenre !== "all") {
        if (query) {
          searchTerm = `${query} AND subject:"${selectedGenre}"`;
        } else {
          searchTerm = `subject:"${selectedGenre}"`;
        }
      }

      let sortParam = "";
      let additionalParams = "";
      
      // Increase limit for "All books" view
      const limit = selectedGenre === "all" ? 300 : 24;
      
      switch (sort) {
        case "rating":
          sortParam = "&sort=rating";
          break;
        case "new":
          sortParam = "&sort=new";
          // Add year filter to get books with better metadata
          const currentYear = new Date().getFullYear();
          additionalParams = `&publish_year=${currentYear - 5}-${currentYear}`;
          break;
        case "old":
          sortParam = "&sort=old";
          additionalParams = "&publish_year=1800-1990";
          break;
        case "title":
          sortParam = "&sort=title";
          break;
      }
      
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=${limit}${sortParam}${additionalParams}`
      );
      const data = await response.json();
      
      // Filter books to only show those with covers
      const booksWithCovers = (data.docs || []).filter((book: Book) => book.cover_i);
      setBooks(booksWithCovers);
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
    setSearchParams({ q: query, genre, sort: sortBy });
  };

  const handleSortChange = (value: string) => {
    setSearchParams({ q: searchQuery, genre, sort: value });
  };

  const handleGenreChange = (value: string) => {
    setSearchParams({ q: searchQuery, genre: value, sort: sortBy });
  };

  useEffect(() => {
    fetchBooks(searchQuery, genre, sortBy);
  }, [searchQuery, genre, sortBy]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Discover Books</h1>
          <p className="text-muted-foreground text-lg">
            Find your next favorite read from millions of books
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} placeholder="Search by title, author, or ISBN..." />
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs value={genre} onValueChange={handleGenreChange} className="w-full sm:w-auto">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All books</TabsTrigger>
              <TabsTrigger value="fiction">Fiction</TabsTrigger>
              <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
              <TabsTrigger value="science fiction">Sci-Fi</TabsTrigger>
              <TabsTrigger value="romance">Romance</TabsTrigger>
              <TabsTrigger value="mystery">Mystery</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-muted/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="old">Oldest</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
