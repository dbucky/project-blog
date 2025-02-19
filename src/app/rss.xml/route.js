import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

export async function GET(request) {
  const blogPosts = await getBlogPostList();

  const protocol = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('x-forwarded-host');
  const siteUrl = `${protocol}://${host}`;

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: request.url,
    site_url: siteUrl,
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${siteUrl}/${post.slug}`,
      date: post.publishedOn,
    });
  });

  const response = new Response(feed.xml());
  response.headers.append('Content-Type', 'application/xml');
  return response;
}
