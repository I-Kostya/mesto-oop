import './blocks/index.css';
import { AppApi } from './components/base/AppApi';
import { CardData } from './components/base/CardsData';
import { UserData } from './components/base/UserData';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { IApi } from './types';
import { API_URL, settings } from './utils/constants';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi);

const cardsData = new CardData(events);
const userData = new UserData(events);






Promise.all([api.getUser(), api.getCards()])
.then(([userInfo, initialCards]) => {
  userData.setUserInfo(userInfo);
  cardsData.cards = initialCards;
  console.log(cardsData.cards);
  console.log(userData.getUserInfo());
  })
  .catch((err) => {
    console.error(err);
  });