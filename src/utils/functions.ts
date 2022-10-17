import { Hero } from '@app/utils/types';

import { badDescriptions, regularDescriptions, goodDescriptions, awesomeDescriptions } from './constants';

export const getHeroData = async (): Promise<Hero[]> => {
  const resp = await fetch('herodata/data.json');
  if (!resp.ok) throw new Error('Error fetching hero data');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonData: Hero[] = await resp.json();
  return jsonData;
};

export const getRandomDesc = (descs: string[]) => descs[Math.floor(Math.random() * descs.length)];

export const getPoinsDesc = (points: number) => {
  switch (true) {
    case points < 3:
      return getRandomDesc(badDescriptions);
    case points >= 3 && points <= 5:
      return getRandomDesc(regularDescriptions);
    case points >= 6 && points <= 8:
      return getRandomDesc(goodDescriptions);
    case points >= 9:
      return getRandomDesc(awesomeDescriptions);
  }
  return 'This should never ever be shown';
};
