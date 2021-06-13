import { observable, action } from "mobx";

import { createContext, useContext } from "react";
import { toast } from "react-toastify";

interface TodosList {
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
  @observable todosLists: TodosListGroups = {
    personalTodos: [],
    workTodos: [],
    generalTodos: [],
    homeTodos: [],
    schoolTodos: [],
  };

  constructor() {
    this.todosLists = JSON.parse(
      localStorage.getItem("todosLists") || JSON.stringify(this.todosLists)
    );
  }

  @action.bound
  setTodosList = (todosList: string[]) => {
    // this.todosLists = todosList;
  };

  @action.bound
  addTodo = (todo: string, type: Categories) => {
    this.todosLists = {
      ...this.todosLists,
      [type]: [
        ...(this.todosLists[type] ?? []),
        { todo, isComplete: false, id: this.todosLists[type].length },
      ],
    };
    if (this.todosLists[type].length === 1)
      toast.info("✅ Tap & Hold on a todo to remove it", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    localStorage.setItem("todosLists", JSON.stringify(this.todosLists));
    return this.todosLists;
  };

  @action.bound
  markAsComplete = (type: Categories, id: number) => {
    this.todosLists[type].some(task => {
      if (task.id === id) {
        this.todosLists[type][id].isComplete = true;
        return true;
      }
      return false;
    });
  };

  @action
  clearLocalStorage = () => {
    localStorage.clear();
  };
}

export const appStore = new AppStore();

const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);
