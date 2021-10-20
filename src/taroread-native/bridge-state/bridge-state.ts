import { TaroreadJournal, TaroreadUser } from "taroread-native";

export type BridgeState = {
  user: TaroreadUser | null;

  // Always  null now, added for future work.
  firebaseInstanceName: string | null;
};
