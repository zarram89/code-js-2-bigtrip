import MainTripInfoView from './view/main-trip-info-view.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render, RenderPosition} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsElement});

render(new MainTripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripMainElement.querySelector('.trip-controls__filters'));
render(new NewEventButtonView(), tripMainElement);

eventsPresenter.init();
