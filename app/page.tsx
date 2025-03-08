'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameGeneratorQuestionnaire from '@/app/components/NameGeneratorQuestionnaire';
import NameResults from '@/app/components/NameResults';

type GeneratorType = 'business' | 'baby' | 'hashtag' | 'pet';

interface GeneratorTypeOption {
  id: GeneratorType;
  name: string;
  description: string;
}

const generatorTypes: GeneratorTypeOption[] = [
  { 
    id: 'business', 
    name: 'Business Name', 
    description: 'Generate a brandable business or startup name'
  },
  { 
    id: 'baby', 
    name: 'Baby Name', 
    description: 'Find the perfect name for your baby'
  },
  { 
    id: 'pet', 
    name: 'Pet Name', 
    description: 'Create a unique name for your pet'
  },
  { 
    id: 'hashtag', 
    name: 'Hashtag', 
    description: 'Generate engaging social media hashtags'
  }
];

export default function Home() {
  const [keywords, setKeywords] = useState('');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<GeneratorType>('business');
  const [generatorAnswers, setGeneratorAnswers] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.trim()) {
      setIsQuestionnaireOpen(true);
    }
  };

  const handleQuestionnaireComplete = (answers: any) => {
    setGeneratorAnswers({ ...answers, timestamp: Date.now() }); // Add timestamp to force re-render
    setIsQuestionnaireOpen(false);
  };

  const handleStartOver = () => {
    setGeneratorAnswers(null);
    setKeywords('');
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as GeneratorType);
    setGeneratorAnswers(null);
    setKeywords('');
    setIsQuestionnaireOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-600">
              AI Name Generator
            </h1>
            <Tabs 
              value={selectedType} 
              onValueChange={handleTypeChange}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-blue-50/50 p-1 rounded-xl">
                {generatorTypes.map((type) => (
                  <TabsTrigger 
                    key={type.id} 
                    value={type.id}
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-blue-500"
                  >
                    {type.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-blue-900">
              {generatorTypes.find(t => t.id === selectedType)?.name}
            </h2>
            <p className="text-lg text-blue-600">
              {generatorTypes.find(t => t.id === selectedType)?.description}
            </p>
          </div>

          {!generatorAnswers ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={getPlaceholder(selectedType)}
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="h-14 text-lg px-6 rounded-2xl shadow-sm border-blue-200 bg-white focus:border-blue-400 focus:ring-blue-400"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 rounded-xl transition-colors"
                >
                  Generate
                </Button>
              </div>
              <p className="text-sm text-blue-500">
                Press Enter or click Generate to start
              </p>
            </form>
          ) : (
            <NameResults 
              type={selectedType} 
              answers={generatorAnswers}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>

      <Dialog open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen}>
        <NameGeneratorQuestionnaire
          type={selectedType}
          isOpen={isQuestionnaireOpen}
          onClose={() => setIsQuestionnaireOpen(false)}
          onComplete={handleQuestionnaireComplete}
          initialKeywords={keywords}
        />
      </Dialog>
    </div>
  );
}

function getPlaceholder(type: GeneratorType): string {
  switch (type) {
    case 'business':
      return 'Describe your business (e.g., tech startup, coffee shop)';
    case 'baby':
      return 'Add preferences (e.g., traditional, modern, nature-inspired)';
    case 'pet':
      return 'Describe your pet (e.g., playful cat, energetic dog)';
    case 'hashtag':
      return 'Enter keywords (e.g., fitness motivation)';
    default:
      return 'Enter keywords to generate names';
  }
}
