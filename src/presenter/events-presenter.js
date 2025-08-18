import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventItemEditView from '../view/event-item-edit-view.js';
// import EventItemNewView from '../view/event-item-new-view.js';
import {render} from '../render.js';

import {EVENTS_COUNT} from '../const.js';

export default class EventsPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.sortComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new EventItemEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      render(new EventItemView(), this.eventsListComponent.getElement());
    }
  }
}
