'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import Card from '@/components/Card';
import { BlogPost } from '@/types/sanity';
import { getBlogPosts } from '@/lib/sanity.api';

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section id="blog" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Latest Articles" 
            title="Loading..." 
            description="Please wait while we fetch the blog posts." 
          />
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-300"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return (
      <section id="blog" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Latest Articles" 
            title="My Blog" 
            description={error || "No blog posts available yet."} 
          />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="Latest Articles" 
          title="My Blog" 
          description="Thoughts, tutorials, and insights about web development." 
        />
        
        <div className="mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/blog/${post.slug.current}`}
                className="block h-full"
                scroll={false}
              >
                <Card className="h-full group hover:scale-[1.02] transition-transform duration-300">
                  {post.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
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
                    <h3 className="font-serif text-xl mt-4 group-hover:text-emerald-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-sm text-white/40">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 