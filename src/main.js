import MainTripInfoView from './view/main-trip-info-view.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render, RenderPosition} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

render(new MainTripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripMainElement.querySelector('.trip-controls__filters'));
render(new NewEventButtonView(), tripMainElement);

// модель с рыбой
const pointsModel = new PointsModel();
pointsModel.init(3); // по ТЗ на этом шаге нам хватит 3-х

// презентер получает модель и рендерит
const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsElement, model: pointsModel});
eventsPresenter.init();
