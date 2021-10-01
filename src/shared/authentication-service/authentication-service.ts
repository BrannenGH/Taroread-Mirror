import { TaroreadNative, TaroreadUser } from "taroread-native";

const signInWithGoogle = () => {
    return TaroreadNative.signInWithGoogle();
}

const refreshUser = () => {
    return TaroreadNative.refreshUser();
}

const signOut = () => {
    return TaroreadNative.signOut();
}

const onAuthStateChanged = (func: (user: TaroreadUser) => void) => {
    TaroreadNative.addListener("onAuthStateChanged", func);
    // Everytime a listener is added, push an update to all listeners.
    // Could be architected differently if this becomes a hassle.
    refreshUser();
}

export { signInWithGoogle, refreshUser, signOut, onAuthStateChanged }