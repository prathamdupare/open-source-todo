import { getTodos } from '@/lib/todos';
import { TodoCard } from '@/components/todo-card';
import { FileText, Calendar, Coffee, Zap, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const todos = getTodos();

  const easterEggs = [
    "Don&apos;t worry, you can add any tasks! 📝",
    "This doesn&apos;t even have a backend 🤷‍♂️",
    "Pratham edits all these todos in his neovim and then pushes to github - pretty inefficient right??",
    "Powered by markdown files and procrastination ☕",
    "No databases were harmed in the making of this app 🗃️",
    "Git commits are the only persistence layer here 🚀"
  ];

  const randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            {/* GitHub Button - positioned absolutely to the right */}
            <div className="absolute right-0 top-0">
              <a
                href="https://github.com/prathamdupare/open-source-todo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all text-gray-300 hover:text-white text-sm font-mono"
              >
                <Github className="h-4 w-4" />
                <span>source</span>
              </a>
            </div>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-100 font-mono">
                <span className="text-purple-400">Pratham&apos;s</span> Open Source Todo List
              </h1>
            </div>
            <p className="text-lg text-gray-400 font-mono mb-2">
              <span className="text-cyan-400"># </span>
              markdown-based chaos, organized by dates
            </p>
            <p className="text-sm text-gray-500 font-mono italic">
              <span className="text-yellow-400">⚡ </span>
              {randomEasterEgg}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                    <Calendar className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 font-mono">total_days</p>
                    <p className="text-2xl font-bold text-gray-100 font-mono">{todos.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                    <Coffee className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 font-mono">git_commits</p>
                    <p className="text-2xl font-bold text-purple-400 font-mono">∞</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 font-mono">backend_complexity</p>
                    <p className="text-2xl font-bold text-cyan-400 font-mono">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todo Cards - Scrollable Grid */}
          {todos.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-w-fit">
                {todos.map((todo) => (
                  <div key={todo.slug} className="min-w-[300px]">
                    <TodoCard todo={todo} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 inline-block mb-4">
                <FileText className="mx-auto h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 font-mono mb-2">
                <span className="text-red-400">error:</span> no todo lists found
              </h3>
              <p className="text-sm text-gray-500 font-mono mb-4">
                <span className="text-cyan-400">$ </span>
                mkdir todo && echo &quot;# My First Todo&quot; {'>'}todo/$(date +%Y-%m-%d).md
              </p>
              <p className="text-xs text-gray-600 font-mono italic">
                Pro tip: Pratham usually just creates files in neovim like a caveman 🦣
              </p>
            </div>
          )}

          {/* Footer Easter Egg */}
          <div className="mt-16 text-center border-t border-gray-800/50 pt-8">
            <p className="text-xs text-gray-600 font-mono">
              <span className="text-purple-400">~/</span> Built with Next.js, Tailwind, and questionable life choices
            </p>
            <p className="text-xs text-gray-700 font-mono mt-1">
              No servers, no databases, just markdown files and the power of git 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
