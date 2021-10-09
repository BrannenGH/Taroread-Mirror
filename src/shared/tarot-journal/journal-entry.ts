interface JournalEntry {
  title: string;
  date: string;
  cards: number[];
  description: string;
}

const constructJournalEntry = () => {
  return {
    title: "",
    date: Date().toString(),
    cards: [],
  };
};

export { constructJournalEntry };
export type { JournalEntry };
