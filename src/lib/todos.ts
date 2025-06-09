import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TodoItem {
  slug: string;
  title: string;
  date: string;
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
        date: data.date || '',
        content,
      };
    });

  // Sort by date (newest first)
  return allTodos.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
} 