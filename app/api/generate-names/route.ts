import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateNames } from '@/lib/nameGenerator';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface NameResponse {
  names: Array<{
    name: string;
    description?: string;
    meaning?: string;
    origin?: string;
    tags?: string[];
    seoScore?: number;
    available?: boolean;
    personality?: string[];
  }>;
  source: 'openai' | 'fallback';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, batchSize = 20, batchNumber = 1, ...data } = body;

    try {
      // First try to generate names using OpenAI
      const systemPrompt = getSystemPrompt(type);
      const userPrompt = getUserPrompt(type, data);

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7 + (batchNumber * 0.1), // Increase randomness for each batch
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const names = JSON.parse(response);
      return NextResponse.json({ 
        names, 
        source: 'openai',
        batchNumber,
        hasMore: batchNumber * batchSize < 1000
      });
    } catch (error) {
      console.error('OpenAI API Error:', error);

      // Fallback to our local name generator
      const generatedNames = generateNames(type, { ...data, batchSize, batchNumber });
      const names = generatedNames.map(name => formatName(name, type, data));

      return NextResponse.json({ 
        names, 
        source: 'fallback',
        batchNumber,
        hasMore: batchNumber * batchSize < 1000
      });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to generate names' }, { status: 500 });
  }
}

function getSystemPrompt(type: string): string {
  const basePrompt = `You are a creative name generator. Generate 20 unique names that are:
  1. Memorable and brandable
  2. Unique from each other
  3. Follow the specified format
  Ensure each name is different from previous suggestions.`;

  switch (type) {
    case 'business':
      return `${basePrompt}
      Additional requirements:
      1. Available as domain names
      2. Include description and SEO score
      Format as JSON array with properties: name, description, seoScore (number), available (boolean), tags (array of strings)`;
    
    case 'baby':
      return `${basePrompt}
      Additional requirements:
      1. Include meaning and origin
      2. Include personality traits
      Format as JSON array with properties: name, meaning, origin, personality (array of traits)`;
    
    case 'hashtag':
      return `${basePrompt}
      Additional requirements:
      1. Trending and memorable
      2. Easy to read and type
      Format as JSON array with properties: name, description, tags (array of strings)`;
    
    case 'pet':
      return `${basePrompt}
      Additional requirements:
      1. Match pet characteristics
      2. Include personality traits
      Format as JSON array with properties: name, description, personality (array of traits)`;
    
    default:
      return `${basePrompt}
      Format as JSON array with properties: name, description, tags (array of strings)`;
  }
}

function getUserPrompt(type: string, data: any): string {
  const keywords = data.description || data.keywords || '';
  
  switch (type) {
    case 'business':
      return `Generate business names with these criteria:
      Description: ${keywords}
      Industry: ${data.industry || 'any'}
      Style: ${data.style || 'brandable'}`;
    
    case 'baby':
      return `Generate ${data.gender || 'any gender'} baby names
      ${data.startsWith ? `Starting with: ${data.startsWith}` : ''}
      ${data.endsWith ? `Ending with: ${data.endsWith}` : ''}
      Style: ${keywords}`;
    
    case 'hashtag':
      return `Create hashtag combinations using:
      Primary keyword: ${data.word1 || keywords}
      Secondary keyword: ${data.word2 || ''}`;
    
    case 'pet':
      return `Generate ${data.petType || 'pet'} names with these characteristics:
      ${keywords}`;
    
    default:
      return `Generate names related to: ${keywords}`;
  }
}

function formatName(name: string, type: string, data: any): any {
  const getTags = () => {
    const tags = [];
    if (data.industry) tags.push(data.industry);
    if (data.style) tags.push(data.style);
    if (data.description) {
      const words = data.description.split(' ').slice(0, 3);
      tags.push(...words);
    }
    return tags.filter(Boolean);
  };

  switch (type) {
    case 'business':
    case 'website':
    case 'product':
    case 'app':
      return {
        name,
        description: `A ${data.style || 'brandable'} name for your ${type} in the ${data.industry || 'business'} industry`,
        seoScore: Math.floor(Math.random() * 30) + 70,
        available: Math.random() > 0.3,
        tags: getTags()
      };
    
    case 'baby':
      return {
        name,
        meaning: getRandomMeaning(),
        origin: getRandomOrigin(),
        personality: getRandomPersonalityTraits()
      };
    
    case 'pet':
      return {
        name,
        description: `A perfect name for your ${data.petType || 'pet'}`,
        personality: getRandomPetTraits()
      };
    
    case 'hashtag':
      return {
        name,
        description: 'A trending hashtag combination',
        tags: getTags()
      };
    
    default:
      return {
        name,
        description: 'A generated name',
        tags: getTags()
      };
  }
}

// Helper functions for generating random attributes
function getRandomMeaning(): string {
  const meanings = [
    'Strong and courageous',
    'Bringer of peace',
    'Gift from above',
    'Light of the world',
    'Blessed and prosperous',
    'Noble and wise',
    'Pure of heart',
    'Guardian and protector'
  ];
  return meanings[Math.floor(Math.random() * meanings.length)];
}

function getRandomOrigin(): string {
  const origins = [
    'Latin',
    'Greek',
    'Hebrew',
    'Germanic',
    'Celtic',
    'Sanskrit',
    'Arabic',
    'Old English'
  ];
  return origins[Math.floor(Math.random() * origins.length)];
}

function getRandomPersonalityTraits(): string[] {
  const traits = [
    'Creative',
    'Strong',
    'Kind',
    'Intelligent',
    'Charismatic',
    'Determined',
    'Compassionate',
    'Adventurous'
  ];
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 traits
  return shuffleArray(traits).slice(0, count);
}

function getRandomPetTraits(): string[] {
  const traits = [
    'Playful',
    'Friendly',
    'Energetic',
    'Loyal',
    'Gentle',
    'Curious',
    'Affectionate',
    'Clever'
  ];
  const count = Math.floor(Math.random() * 2) + 2; // 2-3 traits
  return shuffleArray(traits).slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
} 