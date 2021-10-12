import { WebPlugin } from '@capacitor/core';
import {
  TaroreadNativePlugin,
  TaroreadUser,
  TaroreadJournal,
} from './definitions';

// @ts-ignore
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export class TaroreadNativeWeb
  extends WebPlugin
  implements TaroreadNativePlugin
{
  private get user() {
    return firebase.auth().currentUser;
  }

  public initialize(config: any) {
    // Only initialize once for our use case.
    if (firebase.apps.length < 1) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged(user => {
      this.notifyListeners('onAuthStateChanged', user);
    });
  }

  public refreshUser(): void {
    return this.notifyListeners('onAuthStateChanged', this.user);
  }

  public signInWithGoogle(): Promise<TaroreadUser | null> {
    let provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        return result.user;
      })
      .finally(() => this.refreshUser());
  }

  public signOut(): Promise<void> {
    firebase
      .auth()
      .signOut()
      .finally(() => this.refreshUser());
    return Promise.resolve();
  }

  public getReadings(): Promise<{ readings: TaroreadJournal[] }> {
    if (!!this.user) {
      return (
        firebase
          .database()
          .ref(`journals/${this.user?.uid}`)
          .get()
          // Extract value
          .then(
            (journals: any) =>
              journals.val() as { [id: string]: TaroreadJournal },
          )
          // Transform firebase object to an array
          .then(journals =>
            Object.entries(journals).map(([id, reading]) => {
              reading.id = id;
              return reading;
            }),
          )
          .then(
            journals =>
              ({ readings: journals } as { readings: TaroreadJournal[] }),
          )
      );
    } else {
      return Promise.reject();
    }
  }

  public getReading(parameters: { id: string }): Promise<TaroreadJournal> {
    const id = parameters.id;

    if (!!this.user) {
      // @ts-ignore Override database typing.
      return firebase
        .database()
        .ref(`journals/${this.user?.uid}/${id}`)
        .get()
        .then(res => res.val());
    } else {
      return Promise.reject();
    }
  }

  public deleteReading(parameters: { id: string }): Promise<any> {
    const id = parameters.id;

    return firebase.database().ref(`journals/${this.user?.uid}/${id}`).remove();
  }

  public updateReading(parameters: {
    id: string;
    reading: TaroreadJournal;
  }): Promise<any> {
    const id = parameters.id;
    const reading = parameters.reading;

    const readingToStore = { ...reading };
    // Do not store ID in database
    delete readingToStore.id;

    return firebase
      .database()
      .ref(`journals/${this.user?.uid}/${id}`)
      .update(readingToStore);
  }

  public addReading(parameters: { reading: TaroreadJournal }): Promise<string> {
    const reading = parameters.reading;

    return firebase
      .database()
      .ref(`journals/${this.user?.uid}`)
      .push(reading)
      .then(res => {
        return res.key ?? '';
      });
  }
}
