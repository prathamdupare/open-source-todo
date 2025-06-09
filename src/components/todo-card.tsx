"use client";

import ReactMarkdown from 'react-markdown';
import { TodoItem } from '@/lib/todos';
import { Calendar, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';

interface TodoCardProps {
  todo: TodoItem;
}

export function TodoCard({ todo }: TodoCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleEditClick = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Card className="border-2 border-gray-700/50 bg-gray-900/80 backdrop-blur-sm transition-all hover:bg-gray-900/90 hover:shadow-lg hover:shadow-purple-500/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-100">{todo.title}</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEditClick}
                className="p-1 rounded hover:bg-gray-700/50 transition-colors text-gray-500 hover:text-gray-300"
                title="Edit todo"
              >
                <Edit3 className="h-3 w-3" />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="font-mono">{todo.date}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-sm max-w-none text-gray-300">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-base font-bold mb-2 text-purple-300">{children}</h1>,
                h2: ({ children }) => <h2 className="text-sm font-semibold mb-2 mt-3 text-blue-300">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-medium mb-1 mt-2 text-cyan-300">{children}</h3>,
                ul: ({ children }) => <ul className="list-none space-y-1 ml-0">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-gray-300">{children}</ol>,
                li: ({ children, node }) => {
                  const content = String(children);
                  if (content.includes('[ ]')) {
                    return <li className="text-sm flex items-center space-x-2">
                      <span className="text-red-400">○</span>
                      <span className="text-gray-300">{content.replace(/\[\s*\]\s*/, '')}</span>
                    </li>;
                  } else if (content.includes('[x]')) {
                    return <li className="text-sm flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{content.replace(/\[x\]\s*/, '')}</span>
                    </li>;
                  }
                  return <li className="text-sm text-gray-300">{children}</li>;
                },
                p: ({ children }) => <p className="text-sm mb-2 text-gray-300 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="text-purple-300 font-semibold">{children}</strong>,
                code: ({ children }) => <code className="bg-gray-800 text-cyan-300 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
              }}
            >
              {todo.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={closeDialog}
          />
          
          {/* Dialog */}
          <div className="relative bg-gray-800 border border-gray-600 rounded-lg p-6 mx-4 max-w-md w-full">
            <div className="text-center">
              <div className="mb-4">
                <Edit3 className="h-12 w-12 text-red-400 mx-auto" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-100 font-mono mb-2">
                <span className="text-red-400">access denied!</span>
              </h3>
              
              <p className="text-sm text-gray-300 font-mono mb-4 leading-relaxed">
                Nice try! But this isn't editable. Even Pratham edits all these todos in his precious neovim and then pushes to GitHub.
              </p>
              
              <div className="text-xs text-gray-500 font-mono mb-4 space-y-1">
                <p><span className="text-cyan-400">$</span> cd ~/todos</p>
                <p><span className="text-cyan-400">$</span> nvim {todo.date}.md</p>
                <p><span className="text-cyan-400">$</span> git add . && git commit -m "updated todos"</p>
                <p><span className="text-purple-400"># </span>pretty inefficient right??</p>
              </div>
              
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors"
              >
                got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 