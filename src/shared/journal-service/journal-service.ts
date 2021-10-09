import { TaroreadNative, TaroreadJournal } from "taroread-native";

const getJournals = (start: number): Promise<TaroreadJournal[]> => {
  return TaroreadNative.getReadings().then(res => res.readings);
};

const getJournal = (id: string): Promise<TaroreadJournal> => {
  return TaroreadNative.getReading({id: id});
};

const updateJournal = (id: string, journal: TaroreadJournal): Promise<void> => {
  return TaroreadNative.updateReading({id: id, reading: journal});
};

const addJournal = (): Promise<string> => {
  return TaroreadNative.addReading({reading: {
    title: "untitled",
    date: Date().toString(),
    cards: [],
    description: "",
  }});
};

const deleteJournal = (id: string): Promise<void> => {
  return TaroreadNative.deleteReading({id: id});
};

export { getJournals, getJournal, updateJournal, addJournal, deleteJournal };
