import Header from '@/components/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePosts, Post } from '@/hooks/usePosts';
import { useTranslation } from 'react-i18next';

export default function BlogPost() {
  const { slug } = useParams();
  const { getBySlug, tField } = usePosts();
  const { t } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const data = await getBySlug(slug);
      setPost(data);
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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 py-10 prose prose-neutral dark:prose-invert max-w-3xl">
        <h1>{tField(post, 'title')}</h1>
        {post.published_at && (
          <p className="text-sm text-muted-foreground">{new Date(post.published_at).toLocaleDateString()}</p>
        )}
        {post.cover_image && (
          <img src={post.cover_image} alt={tField(post, 'title')} className="w-full rounded-lg" />)
        }
        <p className="lead">{tField(post, 'excerpt')}</p>
        <div dangerouslySetInnerHTML={{ __html: tField(post, 'content') }} />
      </article>
    </div>
  );
}
