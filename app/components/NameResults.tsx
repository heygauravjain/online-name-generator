import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface Name {
  name: string;
  description?: string;
  meaning?: string;
  origin?: string;
  tags?: string[];
  seoScore?: number;
  available?: boolean;
  personality?: string[];
}

interface NameResultsProps {
  type: string;
  answers: any;
  onStartOver: () => void;
}

const colors = [
  'bg-blue-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-green-50',
  'bg-yellow-50',
  'bg-orange-50',
  'bg-red-50',
  'bg-indigo-50',
  'bg-teal-50',
  'bg-cyan-50',
];

const colorCache: { [key: string]: string } = {};

export default function NameResults({ type, answers, onStartOver }: NameResultsProps) {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(20);
  const [batchCount, setBatchCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNames = async (isLoadMore = false) => {
    try {
      isLoadMore ? setLoadingMore(true) : setLoading(true);
      
      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type,
          batchSize: 20,
          batchNumber: batchCount,
          ...answers 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate names');

      const data = await response.json();
      
      if (isLoadMore) {
        setNames(prevNames => {
          const newNames = [...prevNames, ...(data.names || [])];
          // Remove duplicates based on name property
          return Array.from(new Map(newNames.map(item => [item.name, item])).values());
        });
        setBatchCount(prev => prev + 1);
      } else {
        setNames(data.names || []);
      }

      // Check if we should stop loading more
      if (!data.names || data.names.length < 20 || names.length >= 1000) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error generating names:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setBatchCount(1);
    setHasMore(true);
    fetchNames();
  }, [type, answers]);

  const getColorForName = (name: string) => {
    if (!colorCache[name]) {
      colorCache[name] = colors[Math.floor(Math.random() * colors.length)];
    }
    return colorCache[name];
  };

  const handleLoadMore = async () => {
    if (loadingMore || names.length >= 1000) return;
    await fetchNames(true);
    setDisplayCount(prev => prev + 20);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-28 bg-gray-200 rounded-xl">
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Generated Names</h2>
        <Button
          onClick={onStartOver}
          variant="outline"
          className="border-gray-200 hover:bg-gray-50"
        >
          Start Over
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {names.slice(0, displayCount).map((name, index) => (
          <div
            key={`${name.name}-${index}`}
            className={`${getColorForName(name.name)} rounded-xl p-4 transition-all hover:scale-105 cursor-pointer group relative`}
          >
            <div className="text-lg font-semibold text-gray-900">{name.name}</div>
            {name.seoScore && (
              <div className="text-sm text-gray-600">
                SEO Score: {name.seoScore}
              </div>
            )}
            {name.available !== undefined && (
              <div className={`text-sm ${name.available ? 'text-green-600' : 'text-red-600'}`}>
                {name.available ? 'Available' : 'Unavailable'}
              </div>
            )}
            {(name.meaning || name.origin || name.personality) && (
              <div className="opacity-0 group-hover:opacity-100 absolute left-0 right-0 bottom-full mb-2 bg-white p-3 rounded-lg shadow-lg z-10 text-sm">
                {name.meaning && <div><strong>Meaning:</strong> {name.meaning}</div>}
                {name.origin && <div><strong>Origin:</strong> {name.origin}</div>}
                {name.personality && (
                  <div><strong>Traits:</strong> {name.personality.join(', ')}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {loadingMore && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={`loading-${i}`} className="h-28 bg-gray-200 rounded-xl">
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && names.length > 0 && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            {loadingMore ? 'Loading...' : 'Load More Names'}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Showing {Math.min(displayCount, names.length)} of {names.length} names
          </p>
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-gray-600 mt-4">
          All available names have been loaded
        </div>
      )}
    </div>
  );
} 