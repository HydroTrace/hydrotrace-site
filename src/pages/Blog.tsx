import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blogAgriValuation from "@/assets/blog-agri-valuation.png.asset.json";

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  imageAlt?: string;
}

// Add new blog posts here — they will automatically appear in a 2-column grid.
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "blind-spot-agricultural-asset-valuation",
    category: "Insights",
    title: "The blind spot in agricultural asset valuation",
    date: "June 16, 2026",
    image: blogAgriValuation.url,
    imageAlt: "Aerial cyanotype of terraced agricultural fields",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-48">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
          <header className="mb-24">
            <p className="font-['Brown_Std'] font-normal tracking-[0.22em] text-[11px] uppercase text-[#0A1B44] mb-6">
              Blog
            </p>
            <h1 className="font-['Reckless_Neue'] font-light text-[#0A1B44] leading-[1.05] tracking-[-0.01em] text-[40px] sm:text-[56px] lg:text-[76px] max-w-4xl">
              Insights on water risk, governance and stewardship
            </h1>
          </header>

          <div className="border-t border-dashed border-[#DCE2EE]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 pt-24">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden bg-[#F4F6FB] aspect-[16/9] mb-6">
                  <img
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="font-['Brown_Std'] font-normal tracking-[0.22em] text-[11px] uppercase text-[#0A1B44]/70 mb-3">
                  {post.category}
                </p>
                <h2 className="font-['Reckless_Neue'] font-light text-[#0A1B44] text-2xl md:text-3xl leading-snug mb-4 group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h2>
                <p className="font-['Brown_Std'] font-normal tracking-[0.22em] text-[11px] uppercase text-[#0A1B44]/70">
                  {post.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
