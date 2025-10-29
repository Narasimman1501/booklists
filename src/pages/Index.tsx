import { Book, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Book,
      title: "Track Your Reading",
      description: "Keep organized lists of books you're reading, completed, or planning to read",
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Share your thoughts and help others discover great books",
    },
    {
      icon: TrendingUp,
      title: "Discover Trending",
      description: "Find popular books and see what the community is reading",
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Connect with fellow readers and share your reading journey",
    },
  ];

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold">
          Welcome to{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, hsl(217, 91%, 60%), hsl(263, 70%, 50%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BookWorld
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track your reading journey, discover new books, and connect with a community of book lovers
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
            onClick={() => navigate("/discover")}
          >
            Start Exploring
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-smooth"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Everything You Need to Track Your Books</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 space-y-4 hover:shadow-glow transition-smooth border-border bg-card"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 rounded-lg gradient-card border border-border">
        <h2 className="text-3xl font-bold">Ready to Begin Your Reading Journey?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join thousands of readers tracking their books and discovering new favorites
        </p>
        <Button
          size="lg"
          className="gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
          onClick={() => navigate("/auth")}
        >
          Get Started Free
        </Button>
      </section>
    </div>
  );
};

export default Index;
