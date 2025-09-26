import Header from '@/components/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePosts, Post } from '@/hooks/usePosts';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, Bookmark } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const { getBySlug, tField } = usePosts();
  const { t } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const data = await getBySlug(slug);
      setPost(data);
      if (data) {
        const content = tField(data, 'content');
        const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
        setReadingTime(Math.max(1, Math.ceil(wordCount / 200)));
      }
    })();
  }, [slug]);

  useEffect(() => {
    const title = post ? `${tField(post, 'title')} | ${t('hero.cooperativeName')}` : t('blog.title', { defaultValue: 'Blog' });
    document.title = title;
    const desc = post ? tField(post, 'excerpt') : '';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, [post]);

  const handleShare = async () => {
    if (!post) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tField(post, 'title'),
          text: tField(post, 'excerpt'),
          url: window.location.href,
        });
      } catch {
        await navigator.clipboard.writeText(window.location.href);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
    
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
  

      <article className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back', { defaultValue: 'Back' })}
            </button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {post.published_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString()}
                </div>
              )}
              {readingTime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              {tField(post, 'title')}
            </h1>

            {tField(post, 'excerpt') && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {tField(post, 'excerpt')}
              </p>
            )}

            {post.cover_image && (
              <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-elegant mb-8">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={post.cover_image}
                    alt={tField(post, 'title')}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pb-8 border-b">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked ? 'bg-red-50 border-red-200 text-red-600' : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                Like
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isBookmarked ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                Save
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: tField(post, 'content') }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-6">Related Topics</h3>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Main Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">#آسفي #Safi</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer">#المغرب #Morocco</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer">#فخار #pottery</span>
                  <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors cursor-pointer">#تعاونية #cooperative</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Products & Crafts</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'ceramics | خزف',
                    'handmade pottery | فخار يدوي',
                    'traditional crafts | صناعات تقليدية',
                    'decorative pottery | فخار زخرفي',
                    'tiles | بلاط',
                    'clay products | منتجات الطين',
                  ].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs hover:bg-amber-100 transition-colors cursor-pointer border border-amber-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Techniques & Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'craftsmanship | حِرَفية',
                    'traditional techniques | تقنيات تقليدية',
                    'kiln fired | مطهو في الفرن',
                    'clay shaping | تشكيل الطين',
                    'glazing | التزجيج',
                    'artisan skills | مهارات تقليدية',
                  ].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs hover:bg-cyan-100 transition-colors cursor-pointer border border-cyan-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Values & Identity</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'heritage | تراث',
                    'culture | ثقافة',
                    'authentic | أصيل',
                    'sustainability | استدامة',
                    'eco-friendly | صديق للبيئة',
                    'artisanal | حرفي',
                  ].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              {t('blog.cta.title', { defaultValue: 'Interested in our pottery?' })}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('blog.cta.description', { defaultValue: 'Explore our handcrafted collection of traditional Moroccan pottery.' })}
            </p>
            <a href="/shop" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              {t('blog.cta.button', { defaultValue: 'View Collection' })}
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
