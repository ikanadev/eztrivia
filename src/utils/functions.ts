import { Hero } from '@app/utils/types';

export const getHeroData = async (): Promise<Hero[]> => {
  const resp = await fetch('herodata/data.json');
  if (!resp.ok) throw new Error('Error fetching hero data');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonData: Hero[] = await resp.json();
  return jsonData;
};
