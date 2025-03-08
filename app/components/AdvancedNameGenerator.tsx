'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import NameGeneratorQuestionnaire from './NameGeneratorQuestionnaire';
import { getRandomColor } from '@/lib/colors';
import { cn } from '@/lib/utils';

type GeneratorType = 'business' | 'baby' | 'hashtag' | 'pet';

interface GeneratedName {
  name: string;
  description?: string;
  meaning?: string;
  origin?: string;
  tags?: string[];
  seoScore?: number;
  available?: boolean;
  personality?: string[];
}

interface GeneratorTypeOption {
  id: GeneratorType;
  name: string;
}

const generatorTypes: GeneratorTypeOption[] = [
  { id: 'business', name: 'Business Name' },
  { id: 'baby', name: 'Baby Name' },
  { id: 'pet', name: 'Pet Name' },
  { id: 'hashtag', name: 'Hashtag' }
];

export default function AdvancedNameGenerator() {
  const [generatorType, setGeneratorType] = useState<GeneratorType>('business');
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleGenerate = async (userAnswers: Record<string, any>) => {
    try {
      setIsLoading(true);
      setAnswers(userAnswers);

      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: generatorType, ...userAnswers }),
      });

      if (!response.ok) throw new Error('Failed to generate names');

      const data = await response.json();
      setGeneratedNames(data.names);

      if (data.source === 'fallback') {
        toast.info('Using fallback name generator due to API limitations');
      }
    } catch (error) {
      console.error('Error generating names:', error);
      toast.error('Failed to generate names. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: generatorType, ...answers }),
      });

      if (!response.ok) throw new Error('Failed to generate more names');

      const data = await response.json();
      setGeneratedNames(prev => [...prev, ...data.names]);

      if (data.source === 'fallback') {
        toast.info('Using fallback name generator for additional names');
      }
    } catch (error) {
      console.error('Error generating more names:', error);
      toast.error('Failed to load more names. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (name: string) => {
    toast.success(`${name} saved successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">AI Name Generator</h1>
            <Tabs 
              value={generatorType} 
              onValueChange={(value) => setGeneratorType(value as GeneratorType)}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                {generatorTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id}>
                    {type.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <Button
            size="lg"
            onClick={() => setIsQuestionnaireOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Start Generating Names'}
          </Button>
        </div>

        {generatedNames.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedNames.map((name, index) => (
                <Card key={`${name.name}-${index}`} className={cn(
                  "p-4 relative group transition-all duration-300 hover:shadow-lg",
                  getRandomColor(generatorType, answers.gender)
                )}>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-center">{name.name}</h3>
                    
                    {name.description && (
                      <p className="text-sm text-center">{name.description}</p>
                    )}
                    
                    {name.meaning && (
                      <p className="text-sm"><strong>Meaning:</strong> {name.meaning}</p>
                    )}
                    
                    {name.origin && (
                      <p className="text-sm"><strong>Origin:</strong> {name.origin}</p>
                    )}
                    
                    {name.personality && (
                      <div className="text-sm">
                        <strong>Personality:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {name.personality.map((trait, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/50 rounded">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {name.seoScore !== undefined && (
                      <div className="text-sm">
                        <strong>SEO Score:</strong> {name.seoScore}/100
                      </div>
                    )}
                    
                    {name.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {name.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-white/50 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {name.available !== undefined && (
                      <div className="text-sm mt-2">
                        <span className={name.available ? "text-green-700" : "text-red-700"}>
                          {name.available ? "✓ Available" : "✗ Unavailable"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleSave(name.name)}
                  >
                    Save
                  </Button>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More Names"}
              </Button>
            </div>
          </div>
        )}
      </main>

      <NameGeneratorQuestionnaire
        type={generatorType}
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onComplete={handleGenerate}
      />
    </div>
  );
} 