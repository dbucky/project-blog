import React from 'react';

import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE } from '@/constants';
import { loadBlogPost } from '@/helpers/file-helpers';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    return;
  }

  return {
    title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    notFound();
    return;
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        {
          <MDXRemote
            source={blogPost.content}
            components={{
              BlogHero,
              pre: CodeSnippet,
              DivisionGroupsDemo,
              CircularColorsDemo,
            }}
          />
        }
      </div>
    </article>
  );
}

export default BlogPost;
