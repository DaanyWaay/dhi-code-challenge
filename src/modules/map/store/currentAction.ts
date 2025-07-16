import { create } from "zustand";

type CurrentAction = "DRAW_POLYGON" | "OTHER_ACTION";
interface CurrentActionState {
  action?: CurrentAction;
}

interface CurrentActionActions {
  setAction: (action: CurrentAction | undefined) => void;
}

export const useCurrentAction = create<
  CurrentActionState & CurrentActionActions
>((set) => ({
  action: undefined,
  setAction: (action) => set({ action }),
}));
