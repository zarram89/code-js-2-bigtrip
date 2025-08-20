// Простая модель: хранит массив точек + справочники destination/offer
import {generateDestinations} from '../mock/destinations.js';
import {generateOffersByType} from '../mock/offers.js';
import {generatePoint} from '../mock/points.js';

export default class PointsModel {
  #points = [];
  #destinations = [];
  #offersByType = [];

  init(count = 3) {
    this.#destinations = generateDestinations();
    this.#offersByType = generateOffersByType();
    this.#points = Array.from({length: count}, (_, i) => generatePoint({
      destinations: this.#destinations,
      offersByType: this.#offersByType
    }, i + 1))
      // по ТЗ: сверху вниз от самых старых к новым — отсортируем по dateFrom ASC
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  }

  get points() { return this.#points; }
  get destinations() { return this.#destinations; }
  get offersByType() { return this.#offersByType; }

  // помощники
  getDestinationById(id) { return this.#destinations.find((d) => d.id === id); }
  getOffersForType(type) { return this.#offersByType.find((o) => o.type === type)?.offers ?? []; }
}
