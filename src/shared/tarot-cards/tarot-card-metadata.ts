interface TarotCardMetadata {
  id: number,
  published_at: Date,
  created_at: Date,
  updated_at: Date,
  name: string,
  suit: "Major" | "Wands" | "Pentacles" | "Cups" | "Swords",
  value: number,
  keywords: string,
  description: string,
  astrologicalSign: string,
  planet: string,
  picture: PictureMetadata[]
}

interface PictureMetadata {
  id: number,
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  url: "/uploads/Major_Magician_09c3d5b3f9.jpg",
  created_at: Date,
  updated_at: Date
}

export type { TarotCardMetadata, PictureMetadata };