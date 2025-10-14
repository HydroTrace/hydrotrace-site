import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import blogImage from "@/assets/blog-water-blockchain.jpg";

// Sample blog posts data - move to separate file/API later
const blogPosts = [
  {
    slug: "blockchain-water-governance",
    title: "Blockchain Technology in Water Governance",
    description: "Exploring how blockchain can transform water resource management and create transparent governance systems.",
    image: blogImage,
    date: "October 14, 2025",
    content: `
Water governance faces critical challenges in transparency, accountability, and efficient resource allocation. Traditional systems often suffer from data silos, lack of real-time monitoring, and limited stakeholder participation.

## The Promise of Blockchain

Blockchain technology offers a revolutionary approach to water governance by providing:

- **Immutable Records**: Every transaction and measurement is permanently recorded
- **Transparency**: All stakeholders can access verified data in real-time
- **Decentralization**: Removing single points of failure and control
- **Smart Contracts**: Automated enforcement of water rights and regulations

## Real-World Applications

HydroTrace is pioneering the integration of blockchain with water management systems. Our platform enables:

1. **Real-time Monitoring**: IoT sensors feed data directly to the blockchain
2. **Water Rights Trading**: Secure, transparent marketplace for water allocations
3. **Compliance Tracking**: Automated verification of environmental standards
4. **Stakeholder Engagement**: Democratic participation in resource decisions

## The Path Forward

As climate change intensifies water scarcity, innovative governance solutions become increasingly critical. Blockchain technology, combined with advanced sensors and data analytics, provides the foundation for sustainable water management in the 21st century.

The future of water governance is transparent, accountable, and participatory—powered by blockchain technology.
    `
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4 font-['DM_Serif_Text']">
                Blog Post Not Found
              </h1>
              <Button onClick={() => navigate("/blog")} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => navigate("/blog")} 
              variant="ghost" 
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>

            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-['DM_Serif_Text']">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('##')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4 font-['DM_Serif_Text']">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                } else if (paragraph.trim().startsWith('-')) {
                  return (
                    <li key={index} className="text-foreground ml-6 mb-2">
                      {paragraph.replace('-', '').trim()}
                    </li>
                  );
                } else if (paragraph.trim().match(/^\d+\./)) {
                  return (
                    <li key={index} className="text-foreground ml-6 mb-2 list-decimal">
                      {paragraph.replace(/^\d+\./, '').trim()}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
