import React from 'react';
import dynamic from 'next/dynamic';

import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE } from '@/constants';
import { loadBlogPost } from '@/helpers/file-helpers';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  return {
    title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const blogPost = await loadBlogPost(postSlug);

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
            }}
          />
        }
      </div>
    </article>
  );
}

export default BlogPost;
