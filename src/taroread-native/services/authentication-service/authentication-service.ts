import { PluginListenerHandle } from "@capacitor/core";
import { TaroreadNative, TaroreadUser } from "taroread-native";

const signInWithGoogle = () => {
  return TaroreadNative.signInWithGoogle();
};

const refreshUser = () => {
  return TaroreadNative.refreshUser();
};

const signOut = () => {
  return TaroreadNative.signOut();
};

const onAuthStateChanged = (
  func: (user: TaroreadUser | null) => void
): Promise<PluginListenerHandle> => {
  // If user is falsy, then user shall be null.
  return (
    TaroreadNative.addListener("onAuthStateChanged", (user: TaroreadUser) =>
      func(!!user ? user : null)
    )
      // Everytime a listener is added, push an update to all listeners.
      // Could be architected differently if this becomes a hassle.
      .then((handle) => {
        refreshUser();
        return handle;
      })
  );
};

export { signInWithGoogle, refreshUser, signOut, onAuthStateChanged };
