interface JournalEntry {
  title: string;
  date: Date;
  cards: number[];
  description: string;
}

const constructJournalEntry = () => {
  return {
    title: "",
    date: Date(),
    cards: [],
  };
};

export { constructJournalEntry };
export type { JournalEntry };
