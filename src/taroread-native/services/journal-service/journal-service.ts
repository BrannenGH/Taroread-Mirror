import { TaroreadNative, TaroreadJournal } from "taroread-native";
import { BridgeState } from "../../bridge-state/bridge-state";

const getJournals = (
  context: BridgeState,
  start: number
): Promise<TaroreadJournal[]> => {
  return TaroreadNative.getReadings().then((res) => res.readings);
};

const getJournal = (
  context: BridgeState,
  id: string
): Promise<TaroreadJournal> => {
  return TaroreadNative.getReading({ id: id });
};

const updateJournal = (
  context: BridgeState,
  id: string,
  journal: TaroreadJournal
): Promise<void> => {
  return TaroreadNative.updateReading({ id: id, reading: journal });
};

const addJournal = (context: BridgeState): Promise<string> => {
  return TaroreadNative.addReading({
    reading: {
      title: "untitled",
      date: Date().toString(),
      cards: [],
      description: "",
    },
  });
};

const deleteJournal = (context: BridgeState, id: string): Promise<void> => {
  return TaroreadNative.deleteReading({ id: id });
};

export { getJournals, getJournal, updateJournal, addJournal, deleteJournal };
