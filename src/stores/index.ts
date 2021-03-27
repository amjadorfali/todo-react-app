import { configure } from "mobx";
import { AppStore } from "./appStore";

configure({
  computedRequiresReaction: true,
  enforceActions: "observed",
});

export const stores = {
  AppStore,
};

export { useAppStore } from "./appStore";
