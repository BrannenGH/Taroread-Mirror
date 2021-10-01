// @ts-ignore
import firebase from "firebase/compat/app"
import { Plugin } from "@capacitor/core";

/**
 * The bridge between the native layer and the UI layer for Taroread.
 */
export interface TaroreadNativePlugin extends Plugin {
  initialize(config: any): void;
  signInWithGoogle(): Promise<TaroreadUser | null>;
  refreshUser(): void;
  signOut(): Promise<void>;
  getReadings(): Promise<any>;
  getReading(id: number): Promise<any>;
  deleteReading(id: number): Promise<any>;
  updateReading(id: number, reading: any): Promise<any>;
  addReading(reading: any): Promise<any>;
}

/**
 * Abstraction for a user of Taroread.
 */
export interface TaroreadUser { 
  uid: string; 
  displayName: string;
  email: string;
  photoURL: string;
};