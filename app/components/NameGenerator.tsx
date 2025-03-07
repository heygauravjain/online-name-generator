'use client';

import { useState } from 'react';

interface Name {
  name: string;
  gender: 'male' | 'female' | 'unisex';
  origin: string;
  meaning: string;
}

export default function NameGenerator() {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [generatedName, setGeneratedName] = useState<Name | null>(null);

  // Sample names database - we'll expand this later
  const names: Name[] = [
    { name: 'Emma', gender: 'female', origin: 'Germanic', meaning: 'Universal' },
    { name: 'Liam', gender: 'male', origin: 'Irish', meaning: 'Strong-willed warrior' },
    { name: 'Olivia', gender: 'female', origin: 'Latin', meaning: 'Olive tree' },
    { name: 'Noah', gender: 'male', origin: 'Hebrew', meaning: 'Rest, comfort' },
    { name: 'Ava', gender: 'female', origin: 'Latin', meaning: 'Life' },
  ];

  const generateName = () => {
    const filteredNames = selectedGender === 'all' 
      ? names
      : names.filter(name => name.gender === selectedGender);
    
    const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    setGeneratedName(randomName);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">Baby Name Generator</h1>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setSelectedGender('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedGender === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedGender('male')}
          className={`px-4 py-2 rounded-lg ${
            selectedGender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Boy Names
        </button>
        <button
          onClick={() => setSelectedGender('female')}
          className={`px-4 py-2 rounded-lg ${
            selectedGender === 'female' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Girl Names
        </button>
      </div>

      <button
        onClick={generateName}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Generate Name
      </button>

      {generatedName && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{generatedName.name}</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-semibold">Gender:</span> {generatedName.gender}</p>
            <p><span className="font-semibold">Origin:</span> {generatedName.origin}</p>
            <p><span className="font-semibold">Meaning:</span> {generatedName.meaning}</p>
          </div>
        </div>
      )}
    </div>
  );
} 