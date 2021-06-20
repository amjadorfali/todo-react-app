import { action } from "mobx";

import { createContext, useContext } from "react";

export interface TodosList {
  todo: string;
  isComplete: boolean;
  id: number;
  description?: string;
  date?: string;
  urgency?: "crucial" | "moderate" | "low priority";
}
export interface TodosListGroups {
  personalTodos: TodosList[];
  workTodos: TodosList[];
  generalTodos: TodosList[];
  homeTodos: TodosList[];
  schoolTodos: TodosList[];
}
export type Categories = keyof TodosListGroups;

export class AppStore {
  @action
  clearLocalStorage = () => {
    localStorage.clear();
  };
}

export const appStore = new AppStore();

const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
