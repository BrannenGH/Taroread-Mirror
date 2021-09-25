import { TaroreadNative, TaroreadUser } from "taroread-native";

const signInWithGoogle = () => {
    return TaroreadNative.signInWithGoogle();
}

const getUser = () => {
    return TaroreadNative.getUser();
}

const signOut = () => {
    return TaroreadNative.signOut();
}

export { signInWithGoogle, getUser, signOut }