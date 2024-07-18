import './blocks/index.css';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { CardData } from './components/CardsData';
import { ModalWithConfirm } from './components/ModalWithConfirm';
import { ModalWithForm } from './components/ModalWithForm';
import { ModalWithImage } from './components/ModalWithImage';
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

const imageModal = new ModalWithImage(document.querySelector('.popup_type_image'), events);
const userModal = new ModalWithForm(document.querySelector('.popup_type_edit'), events);
const cardModal = new ModalWithForm(document.querySelector('.popup_type_new-card'), events);
const avatarModal = new ModalWithForm(document.querySelector('.popup_type_edit-avatar'), events);
const confirmModal = new ModalWithConfirm(document.querySelector('.popup_type_remove-card'), events);

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

events.on('initialData:loaded', () => {
  const cardsArray = cardsData.cards.map((card) => {
    const cardInstant = new Card(cloneTemplate(cardTemplate), events);
    return cardInstant.render(card, userData.id);
  });

  cardsContainer.render( { catalog: cardsArray } );
  userView.render(userData.getUserInfo());
})

events.on('avatar:open', () => {
  avatarModal.open();
});

events.on('newCard:open', () => {
  cardModal.open();
})

events.on('userEdit:open', () => {
  const { name, about } = userData.getUserInfo();
  const inputValues = { userName: name, userDescription: about}
  userModal.render( { inputValues} );
  userModal.open();
});

events.on('card:select', (data: {card: Card}) => {
  const { card } = data;
  const { name, link } = cardsData.getCard(card._id);
  const image = {name, link};
  imageModal.render({image});
});
