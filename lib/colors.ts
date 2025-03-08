// Predefined color palettes for different name types
const colorPalettes: Record<string, string[] | { male: string[], female: string[] }> = {
  business: [
    'bg-blue-100 text-blue-800',
    'bg-indigo-100 text-indigo-800',
    'bg-purple-100 text-purple-800',
    'bg-cyan-100 text-cyan-800',
    'bg-teal-100 text-teal-800',
  ],
  baby: {
    male: [
      'bg-blue-100 text-blue-800',
      'bg-cyan-100 text-cyan-800',
      'bg-indigo-100 text-indigo-800',
      'bg-emerald-100 text-emerald-800',
      'bg-sky-100 text-sky-800',
    ],
    female: [
      'bg-pink-100 text-pink-800',
      'bg-rose-100 text-rose-800',
      'bg-purple-100 text-purple-800',
      'bg-fuchsia-100 text-fuchsia-800',
      'bg-violet-100 text-violet-800',
    ],
  },
  pet: [
    'bg-amber-100 text-amber-800',
    'bg-orange-100 text-orange-800',
    'bg-yellow-100 text-yellow-800',
    'bg-lime-100 text-lime-800',
    'bg-green-100 text-green-800',
  ],
  hashtag: [
    'bg-slate-100 text-slate-800',
    'bg-zinc-100 text-zinc-800',
    'bg-neutral-100 text-neutral-800',
    'bg-stone-100 text-stone-800',
    'bg-gray-100 text-gray-800',
  ],
};

export function getRandomColor(type: string, gender?: string): string {
  if (type === 'baby' && gender) {
    const babyPalette = colorPalettes.baby as { male: string[], female: string[] };
    return babyPalette[gender as 'male' | 'female'][Math.floor(Math.random() * babyPalette[gender as 'male' | 'female'].length)];
  }
  
  const palette = colorPalettes[type] as string[] || colorPalettes.business as string[];
  return palette[Math.floor(Math.random() * palette.length)];
} 