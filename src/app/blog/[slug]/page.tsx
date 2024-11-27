import { getBlogPostBySlug } from '@/lib/sanity.api';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    normal: ({children}: any) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-emerald-300 pl-4 my-6 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-emerald-300 hover:text-emerald-400 underline transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    code: ({children}: any) => (
      <code className="bg-gray-800 rounded px-2 py-1 font-mono text-sm">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({children}: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({children}: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    return (
      <article className="py-32">
        <div className="container max-w-3xl">
          <Link 
            href="/#blog" 
            className="text-white/60 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
          >
            ← Back to blog
          </Link>
          
          <div className="mt-8">
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-emerald-300/10 text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl mt-4">
              {post.title}
            </h1>
            
            <div className="mt-4 text-white/40">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>

            {post.mainImage && (
              <div className="relative h-[400px] w-full mt-8 rounded-3xl overflow-hidden">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="mt-12">
              <PortableText 
                value={post.content}
                components={components}
              />
            </div>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 