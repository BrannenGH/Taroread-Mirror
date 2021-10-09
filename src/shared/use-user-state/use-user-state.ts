import React, { useEffect, useState } from "react";
import { TaroreadUser } from "taroread-native";
import { onAuthStateChanged } from "../../shared/authentication-service/authentication-service";
import { PluginListenerHandle } from "@capacitor/core";

const useUserState = (): [
  TaroreadUser | null,
  React.Dispatch<React.SetStateAction<TaroreadUser | null>>
] => {
  const [user, setUser] = useState<TaroreadUser | null>(null);
  const [handle, setHandle] = useState<PluginListenerHandle | null>(null);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user)).then((handle) =>
      setHandle(handle)
    );

    return () => {
      handle?.remove();
    };
  }, []);

  return [user, setUser];
};

export { useUserState };
