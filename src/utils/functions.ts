import { Hero, Ability, Question } from '@app/utils/types';
import { OPTIONS, MAX_SKILL_FIND_TRIES } from '@app/utils/constants';

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
    case points >= 6 && points <= 7:
      return getRandomDesc(goodDescriptions);
    case points >= 8 && points <= 9:
      return getRandomDesc(awesomeDescriptions);
    case points >= 10:
      return getRandomDesc(awesomeDescriptions);
  }
  return 'This should never ever be shown';
};

export const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const getSimilarValuesFromArr = (
  values: number[],
  valuesAhead: number,
  step: number,
): number[][] => {
  const arr: number[][] = [];
  values.forEach((val) => {
    arr.push(getSimilarValues(val, valuesAhead, step));
  });
  const res: number[][] = [];
  arr[0].forEach((_, i) => {
    const rowValues: number[] = [];
    arr.forEach((row) => {
      rowValues.push(row[i]);
    });
    res.push(rowValues);
  });
  return res;
};

const getSimilarValues = (value: number, valuesAhead: number, step: number): number[] => {
  const result: number[] = [];
  const valuesBefore = OPTIONS - valuesAhead - 1;
  for (let i = valuesBefore; i > 0; i--) {
    result.push(value - (step * i));
  }
  result.push(value);
  for (let i = 1; i <= valuesAhead; i++) {
    result.push(value + (i * step));
  }
  return result;
};
const getQuestionsAhead = () => {
  const questionsAheadOptions = [];
  for (let i = 0; i < OPTIONS; i++) {
    questionsAheadOptions.push(i);
  }
  return getRandomItem(questionsAheadOptions);
};

const roundWithDecimals = (n: number, places: number): number => {
  return Number(`${Math.round(parseFloat(`${n}e${places}`))}e-${places}`);
};

const getBaseArmorQuestion = (hero: Hero): Question | null => {
  const armor = roundWithDecimals(hero.armor, 1);
  if (isNaN(armor) || armor === 0) return null;
  console.log('Armor question', armor, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionsValues = getSimilarValues(armor, questionsAhead, 0.5);
  return {
    correctIndex,
    question: `What is the base armor of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: optionsValues.map((value) => `${roundWithDecimals(value, 1)}`),
  };
};

const getBaseManaQuestion = (hero: Hero): Question | null => {
  if (hero.max_mana === 0) return null;
  console.log('Mana question', hero.max_mana, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionsValues = getSimilarValues(hero.max_mana, questionsAhead, 50);
  return {
    correctIndex,
    question: `What is the base mana of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: optionsValues.map((value) => `${value}`),
  };
};

const getBaseHealthQuestion = (hero: Hero): Question | null => {
  if (hero.max_health === 0) return null;
  console.log('Health question', hero.max_health, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionsValues = getSimilarValues(hero.max_health, questionsAhead, 50);
  return {
    correctIndex,
    question: `What is the base health of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: optionsValues.map((value) => `${value}`),
  };
};

const getMovementSpeedQuestion = (hero: Hero): Question | null => {
  if (hero.movement_speed === 0) return null;
  console.log('MS question', hero.movement_speed, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionsValues = getSimilarValues(hero.movement_speed, questionsAhead, 10);
  return {
    correctIndex,
    question: `What is the base movement speed of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: optionsValues.map((value) => `${value}`),
  };
};

const getRangeQuestion = (hero: Hero): Question | null => {
  if (hero.attack_range === 0) return null;
  console.log('Attack range question', hero.attack_range, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionsValues = getSimilarValues(hero.attack_range, questionsAhead, 10);
  return {
    correctIndex,
    question: `What is the base attack range of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: optionsValues.map((value) => `${value}`),
  };
};

const getAttackQuestion = (hero: Hero): Question | null => {
  if (hero.damage_max === 0 || hero.damage_min === 0) return null;
  console.log('Damage question', hero.damage_min, hero.damage_max, hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const minDamageValues = getSimilarValues(hero.damage_min, questionsAhead, 5);
  const maxDamageValues = getSimilarValues(hero.damage_max, questionsAhead, 5);
  return {
    correctIndex,
    question: `What is the base damage of ${hero.name_loc}?`,
    imgUrl: `img/heroes/${hero.name.substring(14)}.png`,
    options: minDamageValues.map((min, i) => `${min} - ${maxDamageValues[i]}`),
  };
};

const getHeroSkillCastRangeQuestion = (hero: Hero): Question | null => {
  let ability: Ability | null = null;
  let tries = 1;
  while (ability === null) {
    const ab = getRandomItem(hero.abilities);
    if (ab.cast_ranges.length === 0) {
      tries++;
      continue;
    }
    if (ab.cast_ranges[0] > 0) {
      ability = ab;
    } else {
      // 20 tries before giving up
      if (tries >= MAX_SKILL_FIND_TRIES) return null;
      tries++;
    }
  }
  console.log('skill cast range', JSON.stringify(ability.cast_ranges), hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionValues = getSimilarValuesFromArr(ability.cast_ranges, questionsAhead, 50);
  const isPlural = ability.cast_ranges.length > 1;
  return {
    correctIndex,
    question: `What ${isPlural ? 'are' : 'is'
      } the cast ${isPlural ? 'ranges' : 'range'
      } of ${ability.name_loc}?`,
    imgUrl: `img/skills/${ability.name}.png`,
    options: optionValues.map((values) => values.join(' / ')),
  };
};

const getHeroSkillCooldownQuestion = (hero: Hero): Question | null => {
  let ability: Ability | null = null;
  let tries = 1;
  while (ability === null) {
    const ab = getRandomItem(hero.abilities);
    if (ab.cooldowns.length === 0) {
      tries++;
      continue;
    }
    if (ab.cooldowns[0] > 0) {
      ability = ab;
    } else {
      // 20 tries
      if (tries >= MAX_SKILL_FIND_TRIES) return null;
      tries++;
    }
  }
  console.log('skill cooldown', JSON.stringify(ability.cooldowns), hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionValues = getSimilarValuesFromArr(ability.cooldowns, questionsAhead, 5);
  const isPlural = ability.cooldowns.length > 1;
  return {
    correctIndex,
    question: `What ${isPlural ? 'are' : 'is'
      } the ${isPlural ? 'cooldowns' : 'cooldown'
      } of ${ability.name_loc}`,
    imgUrl: `img/skills/${ability.name}.png`,
    options: optionValues.map((values) => values.join(' / ')),
  };
};

const getHeroSkillManaCostQuestion = (hero: Hero): Question | null => {
  let ability: Ability | null = null;
  let tries = 1;
  while (ability === null) {
    const ab = getRandomItem(hero.abilities);
    if (ab.mana_costs.length === 0) {
      tries++;
      continue;
    }
    if (ab.mana_costs[0] > 0) {
      ability = ab;
    } else {
      if (tries >= MAX_SKILL_FIND_TRIES) return null;
      tries++;
    }
  }
  console.log('mana cost', JSON.stringify(ability.mana_costs), hero.name_loc);
  const questionsAhead = getQuestionsAhead();
  const correctIndex = OPTIONS - questionsAhead - 1;
  const optionValues = getSimilarValuesFromArr(ability.mana_costs, questionsAhead, 10);
  const isPlural = ability.mana_costs.length > 1;
  return {
    correctIndex,
    question: `What ${isPlural ? 'are' : 'is'
      } the mana ${isPlural ? 'costs' : 'cost'
      } of ${ability.name_loc}`,
    imgUrl: `img/skills/${ability.name}.png`,
    options: optionValues.map((values) => values.join(' / ')),
  };
};

export const getRandomQuestion = (heroes: Hero[]): Question => {
  let question: null | Question = null;
  const questionTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  while (question === null) {
    switch (getRandomItem(questionTypes)) {
      case 0:
        question = getMovementSpeedQuestion(getRandomItem(heroes));
        break;
      case 1:
        question = getBaseHealthQuestion(getRandomItem(heroes));
        break;
      case 2:
        question = getBaseManaQuestion(getRandomItem(heroes));
        break;
      case 3:
        question = getBaseArmorQuestion(getRandomItem(heroes));
        break;
      case 4:
        question = getRangeQuestion(getRandomItem(heroes));
        break;
      case 5:
        question = getAttackQuestion(getRandomItem(heroes));
        break;
      case 6:
        question = getHeroSkillCastRangeQuestion(getRandomItem(heroes));
        break;
      case 7:
        question = getHeroSkillCooldownQuestion(getRandomItem(heroes));
        break;
      case 8:
        question = getHeroSkillManaCostQuestion(getRandomItem(heroes));
        break;
    }
  }
  return question;
};
