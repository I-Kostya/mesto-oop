import './blocks/index.css';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { UserInfo } from './components/UserInfo';

import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { IApi } from './types';
import { API_URL, settings } from './utils/constants';
import { testCards, testUser } from './utils/tempConstants';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi);

const cardsData = new CardData(events);
const userData = new UserData(events);
const userView = new UserInfo(document.querySelector('.profile'), events);


const cardTemplate: HTMLTemplateElement = document.querySelector('.card-template');

const cardsContainer = new CardsContainer(document.querySelector('.places__list'));

events.onAll((event) => {
  console.log(event.eventName, event.data);
})

Promise.all([api.getUser(), api.getCards()])
.then(([userInfo, initialCards]) => {
  userData.setUserInfo(userInfo);
  cardsData.cards = initialCards;
  events.emit('initialData:loaded')
  })
  .catch((err) => {
    console.error(err);
  });

  // const card = new Card(cloneTemplate(cardTemplate), events);
  // const card1 = new Card(cloneTemplate(cardTemplate), events);
  // const cardArray = [];
  // cardArray.push(card.render(testCards[0], testUser._id));
  // cardArray.push(card1.render(testCards[1], testUser._id));

  // cardsContainer.render({catalog: cardArray});

  // userView.render(testUser)

  events.on('initialData:loaded', () => {
    const cardsArray = cardsData.cards.map((card) => {
      const cardInstant = new Card(cloneTemplate(cardTemplate), events);
      return cardInstant.render(card, userData.id);
    });

    cardsContainer.render( { catalog: cardsArray } );
    userView.render(userData.getUserInfo());
  })
