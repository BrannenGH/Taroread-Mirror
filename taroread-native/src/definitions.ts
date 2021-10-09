import { Plugin } from '@capacitor/core';

/**
 * The bridge between the native layer and the UI layer for Taroread.
 */
export interface TaroreadNativePlugin extends Plugin {
  initialize(config: any): void;
  signInWithGoogle(): Promise<TaroreadUser | null>;
  refreshUser(): void;
  signOut(): Promise<void>;
  getReadings(): Promise<{ readings: TaroreadJournal[] }>;
  getReading(parameters: { id: string }): Promise<any>;
  deleteReading(parameters: { id: string }): Promise<any>;
  updateReading(prameters: {
    id: string;
    reading: TaroreadJournal;
  }): Promise<any>;
  addReading(parameters: { reading: TaroreadJournal }): Promise<any>;
}

/**
 * Abstraction for a user of Taroread.
 */
export interface TaroreadUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

/**
 * Abstraction for a journal entry.
 */
export interface TaroreadJournal {
  id?: string;
  cards: number[];
  date: string;
  description: string;
  title: string;
}
