import { TaroreadNative, TaroreadUser } from "taroread-native";

const signInWithGoogle = () => {
    return TaroreadNative.signInWithGoogle();
}

const getUser = () => {
    return TaroreadNative.getUser();
}

export { signInWithGoogle, getUser }