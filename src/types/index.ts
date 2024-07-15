interface ICard {
  likes: IUser[];
  _id: string;
  name: string;
  link: string;
  owner: IUser;
  createdAt: Date;
}

interface IUser {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
}

export interface ICardsData {
  cards: ICard[];
  preview: string | null;
}

export type TCardInfo = Pick<ICard, 'name' | 'link'>;

export type TUserPublicInfo = Pick<IUser, 'name' | 'about' | 'avatar'>;

export type TUserBaseInfo = Pick<IUser, 'name' | 'about'>;

export type TUserAvatar = Pick<IUser, 'avatar'>;
