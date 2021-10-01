import { WebPlugin } from '@capacitor/core';
import { TaroreadNativePlugin, TaroreadUser } from './definitions';

// @ts-ignore
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

export class TaroreadNativeWeb extends WebPlugin implements TaroreadNativePlugin {

    private get user() {
        return firebase.auth().currentUser;
    }

    public initialize(config: any) {
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            this.notifyListeners("onAuthStateChanged", user);
        });
    }

    public refreshUser(): void {
        return this.notifyListeners("onAuthStateChanged", this.user);
    }

    public signInWithGoogle(): Promise<TaroreadUser | null> {
        let provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth()
            .signInWithPopup(provider)
            .then((result: any) => {
                return result.user;
            });
    }

    public signOut(): Promise<void> {
        firebase.auth().signOut();
        return Promise.resolve();
    }

    getReadings(): Promise<any> {
        return firebase.database().ref(`journals/${this.user?.uid}`).get();
    }
    getReading(id: number): Promise<any> {
        return firebase.database().ref(`journals/${this.user?.uid}/${id}`).get();
    }
    deleteReading(id: number): Promise<any> {
        return firebase.database().ref(`journals/${this.user?.uid}/${id}`).remove();
    }
    updateReading(id: number, reading: any): Promise<any> {
        return firebase.database().ref(`journals/${this.user?.uid}/${id}`).update(reading);
    }
    addReading(reading: any): Promise<any> {
        return Promise.resolve(firebase.database().ref(`journals/${this.user?.uid}`).push(reading));
    }
}
