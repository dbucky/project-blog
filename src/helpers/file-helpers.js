import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

export const getBlogPostList = React.cache(async function () {
  const fileNames = await readDirectory('/content');

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
});

export const loadBlogPost = React.cache(async function (slug) {
  try {
    const rawContent = await readFile(`/content/${slug}.mdx`);
    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter, content };
  } catch {
    return;
  }
});

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
