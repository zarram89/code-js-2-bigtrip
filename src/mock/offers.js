// Отдельная сущность: опции (offers)
// Структура offers по типу: { type, offers: [{id, title, price}] }

import {POINT_TYPES} from '../const.js';

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const TITLES = [
  'Add luggage', 'Switch to comfort', 'Add meal',
  'Choose seats', 'Priority boarding', 'Insurance'
];

export function generateOffersByType() {
  // для простоты — для каждого типа сделаем от 0 до 4 опций
  return POINT_TYPES.map((type) => {
    const cnt = randomInt(0, 4);
    const offers = Array.from({length: cnt}, (_, i) => ({
      id: `${type}-${i + 1}`,
      title: TITLES[randomInt(0, TITLES.length - 1)],
      price: randomInt(5, 120)
    }));
    return { type, offers };
  });
}
