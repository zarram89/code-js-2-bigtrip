import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventItemEditView from '../view/event-item-edit-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({eventsContainer, model}) {
    this.eventsContainer = eventsContainer;
    this.model = model;
  }

  init() {
    render(this.sortComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);

    const points = this.model.points;

    if (!points.length) {
      // тут можно отрисовать ListEmptyView, если хочешь
      return;
    }

    // Форма редактирования первой точки — первой в списке (как в markup)
    const first = points[0];
    const firstDest = this.model.getDestinationById(first.destinationId);
    const firstTypeOffers = this.model.getOffersForType(first.type);
    render(
      new EventItemEditView({
        point: first,
        dest: firstDest,
        allDestinations: this.model.destinations,
        typeOffers: firstTypeOffers
      }),
      this.eventsListComponent.getElement()
    );

    // Остальные — в режиме просмотра
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const dest = this.model.getDestinationById(p.destinationId);
      const typeOffers = this.model.getOffersForType(p.type);
      const selectedOffers = typeOffers.filter((o) => p.offerIds.includes(o.id));

      render(
        new EventItemView({
          point: p,
          destination: dest,
          selectedOffers
        }),
        this.eventsListComponent.getElement()
      );
    }
  }
}
