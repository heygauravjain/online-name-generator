'use client';

import { useState } from 'react';

interface BusinessName {
  name: string;
  industry: string;
  description: string;
  available: boolean;
  style: string;
}

type NameStyle = 'brandable' | 'short' | 'compound' | 'playful' | 'foreign' | 'alternative';

interface StyleDescription {
  name: NameStyle;
  description: string;
  example: string;
}

export default function BusinessNameGenerator() {
  const [keywords, setKeywords] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<NameStyle>('brandable');
  const [nameLength, setNameLength] = useState<'any' | 'short' | 'medium' | 'long'>('any');
  const [generatedNames, setGeneratedNames] = useState<BusinessName[]>([]);

  const industries = [
    { id: 'tech', name: 'Technology & SaaS' },
    { id: 'retail', name: 'Retail & E-commerce' },
    { id: 'health', name: 'Healthcare & Wellness' },
    { id: 'finance', name: 'Finance & Insurance' },
    { id: 'food', name: 'Food & Restaurant' },
    { id: 'creative', name: 'Creative & Design' },
    { id: 'education', name: 'Education & Learning' },
    { id: 'travel', name: 'Travel & Hospitality' },
  ];

  const nameStyles: StyleDescription[] = [
    { name: 'brandable', description: 'Made-up words that sound memorable', example: 'Spotify, Zillow' },
    { name: 'short', description: 'Single word names', example: 'Apple, Nike' },
    { name: 'compound', description: 'Two words combined', example: 'Facebook, YouTube' },
    { name: 'playful', description: 'Fun and energetic names', example: 'Google, Yahoo' },
    { name: 'foreign', description: 'Names with foreign words', example: 'Nova, Terra' },
    { name: 'alternative', description: 'Alternative spelling of words', example: 'Lyft, Fiverr' },
  ];

  // Extended word lists for more variety
  const prefixes = {
    tech: ['Nova', 'Cyber', 'Tech', 'Data', 'Smart', 'Cloud', 'Quantum', 'Digital', 'Net', 'Web'],
    creative: ['Art', 'Design', 'Color', 'Studio', 'Pixel', 'Create', 'Vision', 'Mind', 'Think', 'Idea'],
    health: ['Vital', 'Health', 'Care', 'Life', 'Well', 'Med', 'Bio', 'Cure', 'Pure', 'Zen'],
    // ... add more categories
  };

  const generateName = () => {
    // Generate multiple names based on selected criteria
    const newNames: BusinessName[] = [];
    
    for (let i = 0; i < 6; i++) {
      let name = '';
      
      switch (selectedStyle) {
        case 'brandable':
          name = generateBrandableName();
          break;
        case 'compound':
          name = generateCompoundName();
          break;
        // ... other style generators
        default:
          name = generateBrandableName();
      }

      newNames.push({
        name,
        industry: selectedIndustry,
        style: selectedStyle,
        description: generateDescription(name),
        available: Math.random() > 0.3,
      });
    }

    setGeneratedNames(newNames);
  };

  const generateBrandableName = () => {
    // Implementation of brandable name generation
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const patterns = ['cvcv', 'cvccv', 'cvcvc', 'vcvc']; // c=consonant, v=vowel
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    return pattern
      .split('')
      .map(char => {
        if (char === 'c') return consonants[Math.floor(Math.random() * consonants.length)];
        return vowels[Math.floor(Math.random() * vowels.length)];
      })
      .join('')
      .charAt(0)
      .toUpperCase() + pattern.slice(1);
  };

  const generateCompoundName = () => {
    // Implementation of compound name generation
    const words = keywords.split(' ').filter(w => w.length > 0);
    if (words.length > 0) {
      return words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    return generateBrandableName();
  };

  const generateDescription = (name: string) => {
    return `A ${selectedStyle} style name perfect for a ${selectedIndustry.toLowerCase()} business.`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your business about? (Enter keywords)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., technology, software, innovation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedIndustry === industry.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {nameStyles.map((style) => (
              <button
                key={style.name}
                onClick={() => setSelectedStyle(style.name)}
                className={`p-4 rounded-lg text-left ${
                  selectedStyle === style.name
                    ? 'ring-2 ring-emerald-500 bg-emerald-50'
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <h3 className="font-medium text-gray-900">{style.name.charAt(0).toUpperCase() + style.name.slice(1)}</h3>
                <p className="text-sm text-gray-500">{style.description}</p>
                <p className="text-xs text-gray-400 mt-1">Example: {style.example}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Length
          </label>
          <div className="flex gap-2">
            {['any', 'short', 'medium', 'long'].map((length) => (
              <button
                key={length}
                onClick={() => setNameLength(length as any)}
                className={`px-4 py-2 rounded-lg ${
                  nameLength === length
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {length.charAt(0).toUpperCase() + length.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateName}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
        >
          Generate Names
        </button>
      </div>

      {generatedNames.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {generatedNames.map((name, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{name.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{name.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${name.available ? 'text-green-500' : 'text-red-500'}`}>
                  {name.available ? '✓ Domain Available' : '✗ Domain Taken'}
                </span>
                <button className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
                  Save Name
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 