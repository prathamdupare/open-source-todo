import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TodoItem {
  slug: string;
  title: string;
  content: string;
}

export function getTodos(): TodoItem[] {
  const todosDirectory = path.join(process.cwd(), 'todo');
  
  // Check if todo directory exists
  if (!fs.existsSync(todosDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(todosDirectory);
  const allTodos = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name): TodoItem => {
      const fullPath = path.join(todosDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: name.replace(/\.md$/, ''),
        title: data.title || name.replace(/\.md$/, ''),
        content,
      };
    });

  // Sort by date extracted from filename (newest first)
  return allTodos.sort((a, b) => {
    const dateA = a.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '';
    const dateB = b.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '';
    return dateB.localeCompare(dateA);
  });
} 