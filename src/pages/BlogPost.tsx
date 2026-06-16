import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, type BlogReference } from "@/data/blogPosts";

/**
 * Replace inline [n] tokens with hoverable, anchor-linked superscript citations.
 * Tooltip shown via native `title` attribute (no external libs) + custom CSS tooltip.
 */
const renderWithCitations = (text: string, references: BlogReference[]) => {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/);
    if (!m) return <span key={i}>{part}</span>;
    const n = parseInt(m[1], 10);
    const ref = references[n - 1];
    const tooltip = ref ? ref.short : `Reference ${n}`;
    return (
      <sup key={i} className="citation">
        <a
          href={`#ref-${n}`}
          className="citation-link"
          data-tooltip={tooltip}
          aria-label={`Citation ${n}: ${tooltip}`}
        >
          {n}
        </a>
      </sup>
    );
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-40 pb-32 container mx-auto px-6 text-center">
          <h1 className="font-['Reckless_Neue'] text-3xl text-[#0A1B44] mb-6">
            Post not found
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="font-['Brown_Std'] text-[#0A1B44] underline"
          >
            Back to all posts
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <header className="bg-[#0A1B44] text-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
          <p className="font-['Brown_Std'] text-[14px] text-white/70 mb-8">
            <Link to="/blog" className="hover:text-white transition-colors">
              All
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white">{post.category}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h1 className="font-['Reckless_Neue'] font-light leading-[1.05] tracking-[-0.01em] text-[40px] md:text-[56px] lg:text-[64px] mb-6">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="font-['Brown_Std'] text-white/85 text-[18px] md:text-[20px] leading-[1.45] mb-8 max-w-xl">
                  {post.subtitle}
                </p>
              )}
              <p className="font-['Brown_Std'] text-[14px] tracking-[0.18em] uppercase text-white/70">
                {post.date}
              </p>
            </div>
            <div className="overflow-hidden bg-white/5">
              <img
                src={post.image}
                alt={post.imageAlt ?? post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="bg-white pt-20 pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <article className="max-w-[720px] mx-auto font-['Brown_Std'] text-[#0A1B44] text-[17px] leading-[1.75]">
            {post.sections.map((section, idx) => (
              <section key={idx} className="mb-10">
                {section.heading && (
                  <h2 className="font-['Reckless_Neue'] font-light text-[#0A1B44] text-[28px] md:text-[32px] leading-tight mt-14 mb-6">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="mb-5 text-[#0A1B44]/90">
                    {renderWithCitations(p, post.references)}
                  </p>
                ))}
              </section>
            ))}

            {/* References */}
            <section className="mt-20 pt-10 border-t border-[#DCE2EE]">
              <h2 className="font-['Reckless_Neue'] font-light text-[#0A1B44] text-[26px] md:text-[28px] mb-6">
                References
              </h2>
              <ol className="reference-list space-y-3 text-[15px] leading-[1.6] text-[#0A1B44]/85">
                {post.references.map((ref, i) => (
                  <li
                    key={i}
                    id={`ref-${i + 1}`}
                    className="pl-2"
                    dangerouslySetInnerHTML={{ __html: ref.html }}
                  />
                ))}
              </ol>
            </section>

            <div className="mt-16">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-['Brown_Std'] text-[#0A1B44] border border-[#0A1B44]/30 px-5 py-2 hover:bg-[#0A1B44]/5 transition-colors"
              >
                <span aria-hidden>←</span> All perspectives
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
