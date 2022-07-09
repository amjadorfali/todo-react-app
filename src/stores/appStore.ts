import { action } from 'mobx';

import { createContext, useContext } from 'react';

export interface TodosList {
  // todo: string;
  // isComplete: boolean;
  // id: number;
  // description?: string;
  // date?: string;
  // urgency?: 'crucial' | 'moderate' | 'low priority';
  action: string;
  category: Categories;
  id: string;
  isDone: boolean;
}

export enum Categories {
  GENERAL = 'general',
  WORK = 'work',
  PERSONAL = 'personal',
  HOME = 'home',
  SCHOOL = 'school',
}

export class AppStore {
  @action
  clearLocalStorage = () => {
    localStorage.clear();
  };
}

export const appStore = new AppStore();

const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
