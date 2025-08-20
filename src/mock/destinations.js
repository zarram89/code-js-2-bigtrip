// Отдельная сущность: пункт назначения
// { id, name, description, pictures: [{src, description}] }

const CITY_NAMES = ['Amsterdam', 'Geneva', 'Chamonix', 'Rome', 'Tokyo', 'Berlin'];

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function sentences(n) {
  const items = LOREM.split('. ').map((s) => s.trim()).filter(Boolean);
  const count = Math.min(Math.max(1, n), items.length);
  return new Array(count).fill(null).map(() => items[randomInt(0, items.length - 1)]).join('. ') + '.';
}

export function generateDestinations() {
  return CITY_NAMES.map((name, idx) => ({
    id: idx + 1,
    name,
    description: sentences(randomInt(1, 5)),
    pictures: Array.from({length: randomInt(1, 5)}, (_, i) => ({
      src: `https://loremflickr.com/248/152?random=${idx + 1}-${i + 1}`,
      description: `${name} view ${i + 1}`
    }))
  }));
}
