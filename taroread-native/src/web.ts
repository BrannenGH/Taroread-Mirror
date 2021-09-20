import { WebPlugin } from '@capacitor/core';
import { TaroreadNativePlugin, TaroreadUser } from './definitions';

// @ts-ignore
import firebase from "firebase";

export class TaroreadNativeWeb extends WebPlugin implements TaroreadNativePlugin {
    private _user: TaroreadUser | null = null;

    public getUser(): Promise<TaroreadUser | null> {
        return Promise.resolve(this._user);
    }

    public signInWithGoogle(): Promise<TaroreadUser | null> {
        let provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth()
            .signInWithPopup(provider)
            .then((result: any) => {
                this._user = result.user; 
                return result.user;
            });
    }
}
