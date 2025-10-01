import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePosts } from '@/hooks/usePosts';
import { useTranslation } from 'react-i18next';

const formatDate = (iso?: string | null) => iso ? new Date(iso).toLocaleDateString() : '';

export default function Blog() {
  const { posts, loading, tField } = usePosts();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pottery-gold/20 via-pottery-bronze/10 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pottery-gold to-pottery-bronze bg-clip-text text-transparent">
              {t('blog.title', { defaultValue: 'Blog' })}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('blog.subtitle', { defaultValue: 'Stories, insights, and traditions from our cooperative' })}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-muted rounded-xl mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-pottery-gold/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-pottery-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">{t('blog.emptyTitle', { defaultValue: 'No posts yet' })}</h2>
            <p className="text-muted-foreground mb-6">
              {t('blog.emptyDescription', { defaultValue: 'Check back soon for new stories and updates from our cooperative.' })}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <a key={p.id} href={`/blog/${p.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 border-border/50">
                {p.cover_image && (
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img 
                      src={p.cover_image} 
                      alt={tField(p, 'title')} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time>{formatDate(p.published_at)}</time>
                  </div>
                  <CardTitle className="text-xl md:text-2xl leading-tight group-hover:text-pottery-gold transition-colors line-clamp-2">
                    {tField(p, 'title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {tField(p, 'excerpt')}
                  </p>
                  <div className="mt-4 flex items-center text-pottery-gold font-medium text-sm group-hover:gap-2 transition-all">
                    <span>{t('blog.readMore', { defaultValue: 'Read more' })}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
