import {createElement} from '../render.js';
import {POINT_TYPES} from '../const.js';
import {toHM} from '../utils/date.js';

function typeList(type) {
  return POINT_TYPES.map((t) => `
    <div class="event__type-item">
      <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===type?'checked':''}>
      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${t[0].toUpperCase()+t.slice(1)}</label>
    </div>`).join('');
}

function destinationOptions(destinations){
  return destinations.map((d) => `<option value="${d.name}"></option>`).join('');
}

function offersEdit(offers, selectedIds){
  if (!offers?.length) return '';
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((o, i) => {
    const id = `event-offer-${i+1}`;
    const checked = selectedIds?.includes(o.id) ? 'checked' : '';
    return `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${o.id}" ${checked}>
            <label class="event__offer-label" for="${id}">
              <span class="event__offer-title">${o.title}</span>
              &plus;&euro;&nbsp;<span class="event__offer-price">${o.price}</span>
            </label>
          </div>`;
  }).join('')}
      </div>
    </section>`;
}

function destinationBlock(dest) {
  if (!dest) return '';
  const photos = dest.pictures?.length
    ? `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${dest.pictures.map((p) => `<img class="event__photo" src="${p.src}" alt="${p.description}">`).join('')}
      </div>
    </div>`
    : '';
  const desc = dest.description ? `<p class="event__destination-description">${dest.description}</p>` : '';
  if (!desc && !photos) return '';
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${desc}
    ${photos}
  </section>`;
}

function createEventItemEditTemplate({point, dest, allDestinations, typeOffers}) {
  // Пустые данные для "создания"
  const type = point?.type ?? 'flight';
  const destinationName = dest?.name ?? '';
  const basePrice = Number.isFinite(point?.basePrice) ? point.basePrice : 0;
  const dateFrom = point?.dateFrom ? toHM(point.dateFrom) : '00:00';
  const dateTo = point?.dateTo ? toHM(point.dateTo) : '00:00';

  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typeList(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type[0].toUpperCase()+type.slice(1)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationOptions(allDestinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${point?.id ? 'Delete' : 'Cancel'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      ${offersEdit(typeOffers, point?.offerIds ?? [])}
      ${destinationBlock(dest)}
    </section>
  </form>
</li>`
  );
}

export default class EventItemEditView {
  constructor({point, dest, allDestinations, typeOffers}) {
    this.point = point ?? null;
    this.dest = dest ?? null;
    this.allDestinations = allDestinations ?? [];
    this.typeOffers = typeOffers ?? [];
  }

  getTemplate() {
    return createEventItemEditTemplate({
      point: this.point,
      dest: this.dest,
      allDestinations: this.allDestinations,
      typeOffers: this.typeOffers
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() { this.element = null; }
}
