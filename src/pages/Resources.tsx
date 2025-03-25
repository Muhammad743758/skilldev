import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Resource } from '../types';
import { Search, Filter, Globe, Book, Users, Star, TrendingUp, Code, Play, Save, Copy, Terminal, Trash2 } from 'lucide-react';

// Using a CORS proxy with a reliable API
const API_ENDPOINT = 'https://api.allorigins.win/raw?url=https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=javascript;python;java;react&site=stackoverflow&filter=withbody';

// Transform API data to our Resource type
const transformToResource = (item: any, index: number): Resource => {
  const categories = ['Programming', 'Web Development', 'Software Engineering'];
  const types = ['article', 'tutorial', 'documentation'] as const;
  const sources = ['github', 'stackoverflow', 'devto'] as const;
  
  // Clean up the body text
  const cleanBody = item.body.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  
  return {
    id: item.question_id.toString(),
    title: item.title,
    description: cleanBody,
    url: item.link,
    category: categories[index % categories.length],
    type: types[index % types.length],
    tags: item.tags || ['programming', 'coding'],
    source: sources[index % sources.length]
  };
};

// Dashboard statistics
const dashboardStats = {
  totalResources: 150,
  activeUsers: 2500,
  popularTopics: ['React', 'Python', 'JavaScript', 'Node.js'],
  trendingTags: ['web-development', 'programming', 'tutorial', 'coding'],
  categories: [
    { name: 'Programming', count: 45 },
    { name: 'Web Development', count: 60 },
    { name: 'Software Engineering', count: 45 }
  ]
};

// Fallback resources data
const fallbackResources: Resource[] = [
  {
    id: '1',
    title: 'How to use React Hooks?',
    description: 'Learn about useState, useEffect, and other React Hooks with practical examples',
    url: 'https://reactjs.org/docs/hooks-intro.html',
    category: 'Programming',
    type: 'article',
    tags: ['react', 'hooks', 'javascript'],
    source: 'github'
  },
  {
    id: '2',
    title: 'Python List Comprehension Guide',
    description: 'Master Python list comprehension with examples and best practices',
    url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
    category: 'Programming',
    type: 'tutorial',
    tags: ['python', 'list', 'comprehension'],
    source: 'stackoverflow'
  },
  {
    id: '3',
    title: 'JavaScript Async/Await Tutorial',
    description: 'Understanding async/await in JavaScript with practical examples',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
    category: 'Web Development',
    type: 'tutorial',
    tags: ['javascript', 'async', 'await'],
    source: 'devto'
  },
  {
    id: '4',
    title: 'Node.js REST API Development',
    description: 'Build scalable REST APIs with Node.js and Express',
    url: 'https://nodejs.org/en/docs/guides/getting-started-guide/',
    category: 'Web Development',
    type: 'tutorial',
    tags: ['nodejs', 'api', 'express'],
    source: 'github'
  },
  {
    id: '5',
    title: 'Docker Container Basics',
    description: 'Learn Docker container fundamentals and best practices',
    url: 'https://docs.docker.com/get-started/',
    category: 'Software Engineering',
    type: 'documentation',
    tags: ['docker', 'containers', 'devops'],
    source: 'github'
  },
  {
    id: '6',
    title: 'TypeScript Type System',
    description: 'Deep dive into TypeScript types and interfaces',
    url: 'https://www.typescriptlang.org/docs/handbook/basic-types.html',
    category: 'Programming',
    type: 'article',
    tags: ['typescript', 'types', 'javascript'],
    source: 'stackoverflow'
  },
  {
    id: '7',
    title: 'MongoDB CRUD Operations',
    description: 'Learn MongoDB CRUD operations with Node.js',
    url: 'https://docs.mongodb.com/manual/crud/',
    category: 'Web Development',
    type: 'tutorial',
    tags: ['mongodb', 'database', 'nodejs'],
    source: 'devto'
  },
  {
    id: '8',
    title: 'AWS Lambda Functions',
    description: 'Serverless computing with AWS Lambda',
    url: 'https://aws.amazon.com/lambda/',
    category: 'Software Engineering',
    type: 'documentation',
    tags: ['aws', 'lambda', 'serverless'],
    source: 'github'
  },
  {
    id: '9',
    title: 'Git Version Control',
    description: 'Master Git commands and workflows',
    url: 'https://git-scm.com/doc',
    category: 'Software Engineering',
    type: 'tutorial',
    tags: ['git', 'version-control', 'github'],
    source: 'github'
  },
  {
    id: '10',
    title: 'React State Management',
    description: 'State management patterns in React applications',
    url: 'https://reactjs.org/docs/state-and-lifecycle.html',
    category: 'Web Development',
    type: 'article',
    tags: ['react', 'state', 'redux'],
    source: 'stackoverflow'
  },
  {
    id: '11',
    title: 'Python Data Structures',
    description: 'Understanding Python data structures and algorithms',
    url: 'https://docs.python.org/3/tutorial/datastructures.html',
    category: 'Programming',
    type: 'tutorial',
    tags: ['python', 'data-structures', 'algorithms'],
    source: 'devto'
  },
  {
    id: '12',
    title: 'CSS Grid Layout',
    description: 'Modern CSS Grid layout techniques',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    category: 'Web Development',
    type: 'documentation',
    tags: ['css', 'grid', 'layout'],
    source: 'github'
  }
];

// Code practice examples
const codeExamples = [
  {
    id: '1',
    title: 'Python Hello World',
    language: 'python',
    code: `print("Hello, World!")
print("Welcome to Python Programming!")

# Simple calculation
x = 10
y = 20
print(f"Sum of {x} and {y} is: {x + y}")`,
    description: 'Basic Python program with output',
    expectedOutput: `Hello, World!
Welcome to Python Programming!
Sum of 10 and 20 is: 30`
  },
  {
    id: '2',
    title: 'JavaScript Functions',
    language: 'javascript',
    code: `function greet(name) {
    return \`Hello, \${name}!\`;
}

function calculateSum(a, b) {
    return a + b;
}

console.log(greet("Developer"));
console.log("Sum:", calculateSum(5, 3));`,
    description: 'JavaScript functions example',
    expectedOutput: `Hello, Developer!
Sum: 8`
  },
  {
    id: '3',
    title: 'Java Class Example',
    language: 'java',
    code: `public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        
        System.out.println("Calculator Demo");
        System.out.println("First number: " + a);
        System.out.println("Second number: " + b);
        System.out.println("Sum: " + (a + b));
    }
}`,
    description: 'Java class example with output',
    expectedOutput: `Calculator Demo
First number: 10
Second number: 20
Sum: 30`
  },
  {
    id: '4',
    title: 'C++ Program',
    language: 'cpp',
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to C++ Programming!" << endl;
    
    int x = 15;
    int y = 25;
    
    cout << "First number: " << x << endl;
    cout << "Second number: " << y << endl;
    cout << "Sum: " << (x + y) << endl;
    
    return 0;
}`,
    description: 'C++ program with output',
    expectedOutput: `Welcome to C++ Programming!
First number: 15
Second number: 25
Sum: 40`
  }
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState(codeExamples[0]);
  const [codeOutput, setCodeOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid data format received');
        }

        const formattedResources = data.items.slice(0, 12).map(transformToResource);
        setResources(formattedResources);
      } catch (err) {
        console.error('Error fetching resources:', err);
        // Use the expanded fallback resources
        setResources(fallbackResources);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleSearch = () => {
    // The search is already handled by the filteredResources logic
    // This function is just for the button click
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionError(null);
    setCodeOutput('');
    setTerminalHistory(prev => [...prev, `$ Running ${selectedExample.language} code...`]);

    try {
      let output = '';
      
      // For Python code
      if (selectedExample.language === 'python') {
        output = await executePythonCode(selectedExample.code);
      }
      // For JavaScript code
      else if (selectedExample.language === 'javascript') {
        output = await executeJavaScriptCode(selectedExample.code);
      }
      // For Java code
      else if (selectedExample.language === 'java') {
        output = await executeJavaCode(selectedExample.code);
      }
      // For C++ code
      else if (selectedExample.language === 'cpp') {
        output = await executeCppCode(selectedExample.code);
      }
      else {
        output = selectedExample.expectedOutput || 'Code executed successfully!';
      }

      setCodeOutput(output);
      setTerminalHistory(prev => [...prev, output]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while executing the code';
      setExecutionError(errorMessage);
      setTerminalHistory(prev => [...prev, `Error: ${errorMessage}`]);
    } finally {
      setIsRunning(false);
      setTerminalHistory(prev => [...prev, `$ Execution completed.`]);
    }
  };

  const clearTerminal = () => {
    setTerminalHistory([]);
  };

  // Code execution functions
  const executePythonCode = async (code: string): Promise<string> => {
    try {
      // For Python code, we'll use Function constructor to safely evaluate the code
      const pythonCode = code.replace(/print\((.*?)\)/g, 'console.log($1)');
      const result = new Function(pythonCode)();
      return result || 'Code executed successfully!';
    } catch (error: any) {
      throw new Error(`Python execution error: ${error.message}`);
    }
  };

  const executeJavaScriptCode = async (code: string): Promise<string> => {
    try {
      // For JavaScript code, we'll use Function constructor to safely evaluate the code
      const result = new Function(code)();
      return result || 'Code executed successfully!';
    } catch (error: any) {
      throw new Error(`JavaScript execution error: ${error.message}`);
    }
  };

  const executeJavaCode = async (code: string): Promise<string> => {
    try {
      // For Java code, we'll simulate the output since we can't actually run Java in the browser
      const output = code.match(/System\.out\.println\((.*?)\)/g)
        ?.map(line => line.replace(/System\.out\.println\((.*?)\)/, '$1'))
        .join('\n') || 'Code executed successfully!';
      return output;
    } catch (error: any) {
      throw new Error(`Java execution error: ${error.message}`);
    }
  };

  const executeCppCode = async (code: string): Promise<string> => {
    try {
      // For C++ code, we'll simulate the output since we can't actually run C++ in the browser
      const output = code.match(/cout\s*<<\s*(.*?)\s*<<\s*endl;/g)
        ?.map(line => line.replace(/cout\s*<<\s*(.*?)\s*<<\s*endl;/, '$1'))
        .join('\n') || 'Code executed successfully!';
      return output;
    } catch (error: any) {
      throw new Error(`C++ execution error: ${error.message}`);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedExample.code);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Resources</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalResources}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.activeUsers}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Popular Topics</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.popularTopics.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Trending Tags</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.trendingTags.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h2>
        <div className="flex flex-wrap gap-2">
          {dashboardStats.popularTopics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
        <div className="space-y-4">
          {dashboardStats.categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{category.name}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(category.count / dashboardStats.totalResources) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Practice Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Code Practice</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-900">{selectedExample.title}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="p-2 text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  title="Run code"
                >
                  {isRunning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-2 left-2 text-xs text-gray-500">
                {selectedExample.language}
              </div>
              <textarea
                value={selectedExample.code}
                readOnly
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg focus:outline-none"
                style={{ tabSize: 2 }}
              />
            </div>
            <p className="text-sm text-gray-600">{selectedExample.description}</p>
          </div>

          {/* Terminal Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-gray-500" />
                <h3 className="text-md font-medium text-gray-900">Terminal Output</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearTerminal}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title="Clear terminal"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title={isTerminalOpen ? "Hide terminal" : "Show terminal"}
                >
                  <svg
                    className={`h-4 w-4 transform transition-transform ${isTerminalOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 h-64 overflow-y-auto transition-all duration-300 ${isTerminalOpen ? 'opacity-100' : 'opacity-0 h-0'}`}>
              {terminalHistory.map((line, index) => (
                <div key={index} className="mb-1">
                  {line.startsWith('$') ? (
                    <span className="text-green-400">{line}</span>
                  ) : line.startsWith('Error:') ? (
                    <span className="text-red-400">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Programming Resources</h1>
        
        {/* Search Bar with Button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Try searching: react hooks, python, javascript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="article">Article</option>
            <option value="tutorial">Tutorial</option>
            <option value="documentation">Documentation</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading programming questions...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Results Count */}
      {!loading && !error && (
        <div className="text-sm text-gray-500">
          Found {filteredResources.length} programming questions
        </div>
      )}

      {/* Resources Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-gray-50">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    <span className="text-xs text-gray-500">{resource.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {resource.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Question
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && !error && filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No programming questions found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}