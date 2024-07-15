# Проектная работа Mesto на классах

Стек: HTML, css, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/blocks/index.css — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## данные и типы данных, используемые в приложении

Карточка

```ts
interface ICard {
	likes: IUser[];
	_id: string;
	name: string;
	link: string;
	owner: IUser;
	createdAt: Date;
}
```

Пользователь

```ts
interface IUser {
	name: string;
	about: string;
	avatar: string;
	_id: string;
	cohort: string;
}
```

Интерфейс для модели данных карточек

```ts
export interface ICardsData {
	cards: ICard[];
	preview: string | null;
}
```

Данные карточки, используемые в форме при создании новой карточки

```ts
export type TCardInfo = Pick<ICard, 'name' | 'link'>;
```

Основные данные пользователя, которые можно редактировать

```ts
export type TUserPublicInfo = Pick<IUser, 'name' | 'about' | 'avatar'>;
```

Данные пользователя в форме редактирования профиля

```ts
export type TUserBaseInfo = Pick<IUser, 'name' | 'about'>;
```

Аватар пользователя

```ts
export type TUserAvatar = Pick<IUser, 'avatar'>;
```
