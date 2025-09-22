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
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{t('blog.title', { defaultValue: 'Blog' })}</h1>
        {loading && <p className="text-muted-foreground">{t('common.loading')}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-muted-foreground">{t('blog.empty', { defaultValue: 'No posts yet.' })}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <a key={p.id} href={`/blog/${p.slug}`} className="block group">
              <Card className="h-full">
                {p.cover_image && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img src={p.cover_image} alt={tField(p, 'title')} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tField(p, 'title')}</CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(p.published_at)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{tField(p, 'excerpt')}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
