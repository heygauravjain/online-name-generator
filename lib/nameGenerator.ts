// Name generation patterns and rules
const patterns = {
  business: {
    prefixes: [
      'Nova', 'Eco', 'Tech', 'Bio', 'Meta', 'Digi', 'Pro', 'Smart', 'Peak', 'Core',
      'Aero', 'Cyber', 'Data', 'Flux', 'Hyper', 'Info', 'Mega', 'Omni', 'Quantum', 'Sync',
      'Ultra', 'Vista', 'Wave', 'Xcel', 'Zen', 'Alpha', 'Beta', 'Delta', 'Neo', 'Prime'
    ],
    suffixes: [
      'ify', 'ly', 'io', 'ia', 'ex', 'ix', 'um', 'us', 'era', 'ova',
      'able', 'ance', 'ate', 'ent', 'ify', 'ise', 'ize', 'ity', 'ive', 'ment',
      'ness', 'sion', 'tion', 'tude', 'ure', 'wise', 'work', 'ware', 'tech', 'sys'
    ],
    compounds: [
      'Hub', 'Lab', 'Tech', 'Mind', 'Link', 'Sync', 'Flow', 'Wave', 'Spark', 'Bridge',
      'Base', 'Cloud', 'Edge', 'Force', 'Grid', 'Logic', 'Pulse', 'Space', 'Stack', 'Zone',
      'Box', 'Desk', 'Dock', 'Port', 'Net', 'Web', 'Wire', 'Works', 'Yard', 'Sphere'
    ],
    descriptors: [
      'Global', 'Prime', 'Elite', 'Next', 'Pure', 'Swift', 'Bright', 'Clear', 'First', 'True',
      'Active', 'Agile', 'Bold', 'Direct', 'Expert', 'Future', 'Grand', 'Ideal', 'Major', 'Noble',
      'Perfect', 'Quick', 'Rapid', 'Smart', 'Strong', 'United', 'Vital', 'Wise', 'Young', 'Zenith'
    ],
  },
  baby: {
    male: {
      prefixes: [
        'Al', 'Br', 'Ch', 'Da', 'El', 'Fr', 'Gr', 'Ja', 'Ka', 'Li',
        'Ma', 'Na', 'Pa', 'Ra', 'Sa', 'Th', 'Tr', 'Vi', 'Wi', 'Za'
      ],
      suffixes: [
        'en', 'an', 'on', 'er', 'in', 'or', 'us', 'am', 'el', 'ar',
        'iel', 'ian', 'ias', 'ick', 'iel', 'ion', 'ius', 'ley', 'ton', 'win'
      ],
      traditional: [
        'James', 'William', 'Oliver', 'Henry', 'Lucas', 'Benjamin', 'Theodore', 'Mateo', 'Jack', 'Daniel',
        'Alexander', 'David', 'Joseph', 'Michael', 'Samuel', 'Sebastian', 'Christopher', 'Andrew', 'Gabriel', 'Joshua'
      ],
      modern: [
        'Kai', 'Zion', 'Atlas', 'Nova', 'Phoenix', 'River', 'Ocean', 'Sky', 'Orion', 'Leo',
        'Axel', 'Finn', 'Nash', 'Zane', 'Ash', 'Ryder', 'Storm', 'Wolf', 'Sage', 'Rain'
      ],
    },
    female: {
      prefixes: [
        'Ad', 'Be', 'Ca', 'El', 'Em', 'Gr', 'Is', 'Li', 'Ma', 'So',
        'Ar', 'Br', 'Ch', 'Da', 'Ev', 'Fa', 'Ha', 'Ju', 'Ka', 'La'
      ],
      suffixes: [
        'a', 'ia', 'na', 'ra', 'la', 'elle', 'lyn', 'rose', 'mae', 'joy',
        'anna', 'bella', 'etta', 'ina', 'issa', 'ity', 'leigh', 'line', 'lyn', 'rie'
      ],
      traditional: [
        'Emma', 'Charlotte', 'Olivia', 'Sophia', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Evelyn', 'Luna',
        'Elizabeth', 'Victoria', 'Grace', 'Sarah', 'Claire', 'Alice', 'Julia', 'Lucy', 'Anna', 'Rose'
      ],
      modern: [
        'Nova', 'Aria', 'Aurora', 'Willow', 'Sage', 'River', 'Quinn', 'Ivy', 'Eden', 'Skye',
        'Winter', 'Raven', 'Phoenix', 'Storm', 'Wren', 'Rain', 'Aspen', 'Brook', 'Dawn', 'Fern'
      ],
    },
  },
  pet: {
    dog: [
      'Buddy', 'Luna', 'Charlie', 'Bella', 'Max', 'Lucy', 'Bailey', 'Rocky', 'Daisy', 'Milo',
      'Cooper', 'Sadie', 'Tucker', 'Molly', 'Bear', 'Sophie', 'Duke', 'Maggie', 'Zeus', 'Ruby'
    ],
    cat: [
      'Luna', 'Milo', 'Oliver', 'Leo', 'Bella', 'Charlie', 'Lucy', 'Max', 'Lily', 'Simba',
      'Shadow', 'Tiger', 'Kitty', 'Smokey', 'Nala', 'Salem', 'Felix', 'Cleo', 'Oscar', 'Oreo'
    ],
    bird: [
      'Rio', 'Sky', 'Sunny', 'Kiwi', 'Mango', 'Pepper', 'Echo', 'Angel', 'Ziggy', 'Coco',
      'Blue', 'Phoenix', 'Storm', 'Cloud', 'Feather', 'Rain', 'Star', 'Wind', 'Dawn', 'Hawk'
    ],
    other: [
      'Nibbles', 'Spike', 'Bubbles', 'Shadow', 'Ziggy', 'Nemo', 'Pepper', 'Cookie', 'Ginger', 'Lucky',
      'Peanut', 'Rocket', 'Sunny', 'Turtle', 'Waddles', 'Whiskers', 'Yoshi', 'Zephyr', 'Ace', 'Banjo'
    ],
  },
};

// Industry-specific keywords for more relevant name generation
const industryKeywords = {
  tech: [
    'Tech', 'Digital', 'Cyber', 'Smart', 'AI', 'Data', 'Cloud', 'Net', 'Web', 'App',
    'Code', 'Byte', 'Pixel', 'System', 'Logic', 'Neural', 'Quantum', 'Robot', 'Virtual', 'Mobile'
  ],
  retail: [
    'Shop', 'Store', 'Market', 'Buy', 'Retail', 'Trade', 'Deal', 'Mart', 'Mall', 'Bazaar',
    'Boutique', 'Outlet', 'Plaza', 'Corner', 'Exchange', 'Gallery', 'House', 'Junction', 'Lane', 'Place'
  ],
  health: [
    'Health', 'Care', 'Med', 'Vital', 'Life', 'Well', 'Cure', 'Heal', 'Bio', 'Fit',
    'Active', 'Balance', 'Core', 'Energy', 'Fresh', 'Glow', 'Heart', 'Mind', 'Pure', 'Zen'
  ],
  finance: [
    'Fin', 'Cash', 'Money', 'Bank', 'Trust', 'Wealth', 'Capital', 'Fund', 'Asset', 'Trade',
    'Credit', 'Equity', 'Gold', 'Invest', 'Market', 'Pay', 'Save', 'Stock', 'Value', 'Worth'
  ],
  creative: [
    'Art', 'Design', 'Create', 'Studio', 'Media', 'Craft', 'Vision', 'Style', 'Color', 'Mind',
    'Brand', 'Canvas', 'Dream', 'Flow', 'Idea', 'Light', 'Muse', 'Spark', 'Think', 'Wave'
  ],
  food: [
    'Taste', 'Food', 'Fresh', 'Flavor', 'Dish', 'Cook', 'Bite', 'Meal', 'Chef', 'Kitchen',
    'Aroma', 'Bistro', 'Cafe', 'Dine', 'Feast', 'Grill', 'Herbs', 'Juice', 'Plate', 'Sweet'
  ],
  education: [
    'Learn', 'Edu', 'Study', 'School', 'Academy', 'Mind', 'Brain', 'Know', 'Teach', 'Think',
    'Book', 'Class', 'Guide', 'Mentor', 'Path', 'Quest', 'Skill', 'Train', 'Wise', 'Youth'
  ],
  entertainment: [
    'Fun', 'Play', 'Joy', 'Happy', 'Live', 'Show', 'Stage', 'Star', 'Event', 'Game',
    'Beat', 'Dance', 'Fest', 'Laugh', 'Music', 'Party', 'Scene', 'Song', 'Thrill', 'Vibe'
  ],
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateBusinessName(description: string = '', style: string = 'brandable', industry: string = 'all'): string {
  const words = description.toLowerCase().split(' ').filter(Boolean);
  const industryWords = industryKeywords[industry as keyof typeof industryKeywords] || [];
  
  switch (style) {
    case 'brandable': {
      const prefix = patterns.business.prefixes[Math.floor(Math.random() * patterns.business.prefixes.length)];
      const suffix = patterns.business.suffixes[Math.floor(Math.random() * patterns.business.suffixes.length)];
      return prefix + suffix;
    }
    
    case 'compound': {
      const firstWord = words.length > 0 ? 
        words[Math.floor(Math.random() * words.length)] :
        patterns.business.descriptors[Math.floor(Math.random() * patterns.business.descriptors.length)].toLowerCase();
      const compound = patterns.business.compounds[Math.floor(Math.random() * patterns.business.compounds.length)];
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + compound;
    }
    
    case 'playful': {
      const descriptor = patterns.business.descriptors[Math.floor(Math.random() * patterns.business.descriptors.length)];
      const industryWord = industryWords.length > 0 ?
        industryWords[Math.floor(Math.random() * industryWords.length)] :
        patterns.business.compounds[Math.floor(Math.random() * patterns.business.compounds.length)];
      return descriptor + industryWord;
    }
    
    default: {
      const word = words.length > 0 ?
        words[Math.floor(Math.random() * words.length)] :
        patterns.business.descriptors[Math.floor(Math.random() * patterns.business.descriptors.length)].toLowerCase();
      const suffix = patterns.business.suffixes[Math.floor(Math.random() * patterns.business.suffixes.length)];
      return word.charAt(0).toUpperCase() + word.slice(1) + suffix;
    }
  }
}

function generateBabyName(gender: string = 'any', startsWith: string = '', endsWith: string = ''): string {
  const genderPatterns = gender === 'female' ? patterns.baby.female :
                        gender === 'male' ? patterns.baby.male :
                        Math.random() > 0.5 ? patterns.baby.male : patterns.baby.female;

  // Combine traditional and modern names
  let possibleNames = [...genderPatterns.traditional, ...genderPatterns.modern];

  // Filter by starting letter if specified
  if (startsWith) {
    possibleNames = possibleNames.filter(name => 
      name.toLowerCase().startsWith(startsWith.toLowerCase())
    );
  }

  // Filter by ending letter if specified
  if (endsWith) {
    possibleNames = possibleNames.filter(name => 
      name.toLowerCase().endsWith(endsWith.toLowerCase())
    );
  }

  // If no matches with filters, generate a new name
  if (possibleNames.length === 0) {
    const prefix = genderPatterns.prefixes[Math.floor(Math.random() * genderPatterns.prefixes.length)];
    const suffix = genderPatterns.suffixes[Math.floor(Math.random() * genderPatterns.suffixes.length)];
    let name = prefix + suffix;
    
    // Ensure it matches the filters
    if (startsWith) name = startsWith.toUpperCase() + name.slice(1);
    if (endsWith) name = name.slice(0, -1) + endsWith.toLowerCase();
    
    return name;
  }

  return possibleNames[Math.floor(Math.random() * possibleNames.length)];
}

function generatePetName(petType: string = 'dog', characteristics: string = ''): string {
  const petNames = patterns.pet[petType as keyof typeof patterns.pet] || patterns.pet.other;
  const traits = characteristics.toLowerCase().split(' ').filter(Boolean);
  
  // 50% chance to use a predefined name or generate a new one
  if (Math.random() > 0.5 || traits.length === 0) {
    return petNames[Math.floor(Math.random() * petNames.length)];
  } else {
    const prefix = traits[Math.floor(Math.random() * traits.length)];
    const suffix = petNames[Math.floor(Math.random() * petNames.length)];
    return prefix.charAt(0).toUpperCase() + prefix.slice(1) + suffix;
  }
}

function generateHashtag(word1: string = '', word2: string = ''): string {
  const w1 = word1 || 'awesome';
  const w2 = word2 || 'vibes';
  
  const combinations = [
    `#${w1}${w2}`,
    `#${w1}_${w2}`,
    `#${w2}${w1}`,
    `#${w1}And${w2}`,
    `#${w1}${w2}Time`,
    `#${w2}With${w1}`,
    `#${w1}${w2}Life`,
    `#${w1}${w2}World`,
    `#The${w1}${w2}`,
    `#${w1}${w2}Community`,
  ];
  
  return combinations[Math.floor(Math.random() * combinations.length)];
}

export function generateNames(type: string, answers: any): string[] {
  const count = 10; // Increased to 10 names per generation
  const names: string[] = [];
  const usedNames = new Set<string>();

  while (names.length < count) {
    let name = '';
    switch (type) {
      case 'business':
      case 'website':
      case 'product':
      case 'app':
        name = generateBusinessName(answers.description, answers.style, answers.industry);
        break;
      case 'baby':
        name = generateBabyName(answers.gender, answers.startsWith, answers.endsWith);
        break;
      case 'pet':
        name = generatePetName(answers.petType, answers.characteristics);
        break;
      case 'hashtag':
        name = generateHashtag(answers.word1, answers.word2);
        break;
      default:
        name = generateBusinessName(answers.description, 'brandable', 'all');
    }

    // Only add unique names
    if (!usedNames.has(name)) {
      names.push(name);
      usedNames.add(name);
    }
  }

  return shuffleArray(names);
} 