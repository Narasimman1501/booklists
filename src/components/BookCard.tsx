import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  genres?: string[];
}

export const BookCard = ({ title, author, coverUrl, rating, genres }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card shadow-card hover:shadow-glow transition-smooth cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Cover
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{author}</p>
        {rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium text-primary">{rating}</span>
          </div>
        )}
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
