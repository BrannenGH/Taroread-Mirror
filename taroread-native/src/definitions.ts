// @ts-ignore
import firebase from 'firebase';

/**
 * The bridge between the native layer and the UI layer for Taroread.
 */
export interface TaroreadNativePlugin {
  signInWithGoogle(): Promise<TaroreadUser | null>;
  getUser(): Promise<TaroreadUser | null>;
}

/**
 * Abstraction for a user of Taroread.
 */
export interface TaroreadUser { 
  displayName: string
  email: string
  photoUrl: string
};