import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-water-blockchain.jpg";

// Sample blog posts data - replace with real data/API later
const blogPosts = [
  {
    slug: "blockchain-water-governance",
    title: "Blockchain Technology in Water Governance",
    description: "Exploring how blockchain can transform water resource management and create transparent governance systems.",
    image: blogImage,
    date: "October 14, 2025"
  }
];

const Blog = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-['DM_Serif_Text']">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Insights on water governance, blockchain technology, and sustainable management
            </p>

            {blogPosts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-xl text-muted-foreground">
                  Currently no blogs available — check back soon.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post: any, index: number) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="aspect-video object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="font-['DM_Serif_Text']">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="font-['DM_Serif_Text']">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
