import { observable, action, computed } from "mobx";

import { createContext, useContext } from "react";

export class AppStore {
  @observable todosList = [""];

  constructor() {
    this.todosList = JSON.parse(localStorage.getItem("todosList") || "[]");
  }
  @action
  setTodosList = (todosList: string[]) => {
    this.todosList = todosList;
  };

  @action
  addTodo = (todo: string) => {
    this.setTodosList([...this.todosList, todo]);
  };
}

export const appStore = new AppStore();

const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
