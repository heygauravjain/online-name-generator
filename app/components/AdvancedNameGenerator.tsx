'use client';

import { useState } from 'react';

type GeneratorType = 'business' | 'baby' | 'combiner' | 'hashtag';

interface GeneratedName {
  name: string;
  type: GeneratorType;
  description?: string;
  meaning?: string;
  origin?: string;
  tags?: string[];
  seoScore?: number;
  available?: boolean;
}

interface StyleOption {
  id: string;
  name: string;
  description: string;
  example: string;
}

export default function AdvancedNameGenerator() {
  const [generatorType, setGeneratorType] = useState<GeneratorType>('business');
  const [keywords, setKeywords] = useState('');
  const [nameStyle, setNameStyle] = useState('brandable');
  const [nameLength, setNameLength] = useState<'any' | 'short' | 'medium' | 'long'>('any');
  const [gender, setGender] = useState<'all' | 'male' | 'female'>('all');
  const [industry, setIndustry] = useState('all');
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [savedNames, setSavedNames] = useState<GeneratedName[]>([]);

  const nameStyles: StyleOption[] = [
    {
      id: 'brandable',
      name: 'Brandable',
      description: 'Made-up words that sound memorable',
      example: 'Spotify, Zillow'
    },
    {
      id: 'compound',
      name: 'Compound',
      description: 'Two words combined',
      example: 'Facebook, YouTube'
    },
    {
      id: 'playful',
      name: 'Playful',
      description: 'Fun and energetic names',
      example: 'Google, Yahoo'
    },
    {
      id: 'traditional',
      name: 'Traditional',
      description: 'Classic and timeless names',
      example: 'James, Elizabeth'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary and trendy names',
      example: 'Zara, Nova'
    }
  ];

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'tech', name: 'Technology' },
    { id: 'retail', name: 'Retail' },
    { id: 'health', name: 'Healthcare' },
    { id: 'finance', name: 'Finance' },
    { id: 'creative', name: 'Creative' },
    { id: 'food', name: 'Food & Restaurant' }
  ];

  const generateBusinessName = () => {
    const prefixes = ['Nova', 'Peak', 'Elite', 'Prime', 'Next', 'Blue', 'Smart', 'Bright'];
    const suffixes = ['Hub', 'Tech', 'Labs', 'Pro', 'Plus', 'Go', 'Now', 'Sync'];
    const names: GeneratedName[] = [];

    for (let i = 0; i < 6; i++) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const name = `${prefix}${suffix}`;
      names.push({
        name,
        type: 'business',
        description: `A modern ${industry} business name`,
        seoScore: Math.floor(Math.random() * 40) + 60,
        available: Math.random() > 0.5,
        tags: ['modern', 'business', industry]
      });
    }
    return names;
  };

  const generateBabyName = () => {
    const names: GeneratedName[] = [];
    const maleNames = ['Liam', 'Noah', 'Oliver', 'James', 'Elijah'];
    const femaleNames = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava'];
    const meanings: Record<string, string> = {
      Liam: 'Strong-willed warrior',
      Noah: 'Rest, comfort',
      Oliver: 'Olive tree',
      James: 'Supplanter',
      Elijah: 'Yahweh is God',
      Olivia: 'Olive tree',
      Emma: 'Universal',
      Charlotte: 'Free',
      Amelia: 'Work',
      Ava: 'Life'
    };

    const nameList = gender === 'male' ? maleNames 
      : gender === 'female' ? femaleNames 
      : [...maleNames, ...femaleNames];

    for (let i = 0; i < 6; i++) {
      const name = nameList[Math.floor(Math.random() * nameList.length)];
      names.push({
        name,
        type: 'baby',
        meaning: meanings[name],
        origin: 'Various origins',
        tags: [gender === 'all' ? 'unisex' : gender, 'traditional']
      });
    }
    return names;
  };

  const generateHashtags = (name: string) => {
    const words = name.toLowerCase().split(/\s+/);
    const tags = [
      `#${words.join('')}`,
      `#${words[0]}${words.length > 1 ? words[1] : ''}`,
      `#the${words[0]}`,
      `#${words[0]}official`,
      `#${words[0]}brand`
    ];
    return tags;
  };

  const handleGenerate = () => {
    let names: GeneratedName[] = [];
    switch (generatorType) {
      case 'business':
        names = generateBusinessName();
        break;
      case 'baby':
        names = generateBabyName();
        break;
      case 'hashtag':
        names = [{
          name: keywords,
          type: 'hashtag',
          tags: generateHashtags(keywords)
        }];
        break;
      default:
        names = generateBusinessName();
    }
    setGeneratedNames(names);
  };

  const handleSave = (name: GeneratedName) => {
    setSavedNames([...savedNames, name]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Name Generator</h1>
            <nav className="flex space-x-4">
              {['business', 'baby', 'combiner', 'hashtag'].map((type) => (
                <button
                  key={type}
                  onClick={() => setGeneratorType(type as GeneratorType)}
                  className={`px-4 py-2 rounded-md ${
                    generatorType === type
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {generatorType === 'business' ? "What's your business about?" 
                  : generatorType === 'baby' ? "Name preferences"
                  : "Enter keywords"}
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            {generatorType === 'business' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => setIndustry(ind.id)}
                        className={`px-3 py-2 text-sm rounded-lg ${
                          industry === ind.id
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name Style
                  </label>
                  <div className="space-y-2">
                    {nameStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setNameStyle(style.id)}
                        className={`w-full p-4 text-left rounded-lg border ${
                          nameStyle === style.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h3 className="font-medium">{style.name}</h3>
                        <p className="text-sm text-gray-500">{style.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Example: {style.example}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {generatorType === 'baby' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  {['all', 'male', 'female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g as any)}
                      className={`px-4 py-2 rounded-lg ${
                        gender === g
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Generate Names
            </button>
          </div>

          {/* Right Content - Generated Names */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedNames.map((name, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{name.name}</h3>
                  {name.description && (
                    <p className="text-gray-600 text-sm mb-3">{name.description}</p>
                  )}
                  {name.meaning && (
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="font-medium">Meaning:</span> {name.meaning}
                    </p>
                  )}
                  {name.origin && (
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="font-medium">Origin:</span> {name.origin}
                    </p>
                  )}
                  {name.seoScore && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>SEO Score</span>
                        <span className="font-medium">{name.seoScore}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${name.seoScore}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {name.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {name.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {name.available !== undefined && (
                    <p className={`text-sm ${name.available ? 'text-green-500' : 'text-red-500'}`}>
                      {name.available ? '✓ Domain available' : '✗ Domain taken'}
                    </p>
                  )}
                  <button
                    onClick={() => handleSave(name)}
                    className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Save Name
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 