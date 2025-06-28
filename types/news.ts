export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
  readTime: string;
  url: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  icon: string;
}