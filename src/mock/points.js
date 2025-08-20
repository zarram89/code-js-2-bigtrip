// Точка маршрута (point)
// { id, type, destinationId, dateFrom, dateTo, basePrice, isFavorite, offerIds: [] }

import {POINT_TYPES} from '../const.js';

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

export function generatePoint({destinations, offersByType}, idx = 1) {
  const type = randomItem(POINT_TYPES);
  const dest = randomItem(destinations);

  // случайные интервалы внутри ближайших 10 суток
  const start = Date.now() + randomInt(-5, 5) * 24 * 60 * 60 * 1000 + randomInt(0, 23)*3600000;
  const durationMin = randomInt(15, 72 * 60); // 15 мин — 72 часа
  const end = start + durationMin * 60 * 1000;

  const typeOffers = offersByType.find((o) => o.type === type)?.offers ?? [];
  // выберем случайно 0..2 оффера
  const shuffled = [...typeOffers].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, randomInt(0, Math.min(2, shuffled.length)));

  return {
    id: String(idx),
    type,
    destinationId: dest.id,
    dateFrom: new Date(start).toISOString(),
    dateTo: new Date(end).toISOString(),
    basePrice: randomInt(0, 500),
    isFavorite: Math.random() < 0.35,
    offerIds: selected.map((o) => o.id),
  };
}
