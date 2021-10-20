import React, { useState, useEffect, createContext } from "react";
import firebaseConfig from "../firebase-config.json";
import PropTypes from "prop-types";
import { BridgeState } from "./bridge-state/bridge-state";
import { initialize as initializeFirebase } from "./services/firebase-service/firebase-service";
import { onAuthStateChanged } from "./services/authentication-service/authentication-service";
import { getJournals } from "./services/journal-service/journal-service";
import { PluginListenerHandle } from "@capacitor/core";

/**
 * Handles native bridge initialization, and
 * @param props
 * @returns
 */
const TaroreadNativeContext = createContext<BridgeState>({
  user: null,
  firebaseInstanceName: null,
});

const TaroreadNative = TaroreadNativeContext.Consumer;

const TaroreadNativeBridge = (props: any) => {
  const [context, setContext] = useState<BridgeState>({
    user: null,
    firebaseInstanceName: null,
  });

  // Keep track of handle for deconstruction
  const [handle, setHandle] = useState<PluginListenerHandle | null>(null);

  // Initialize Firebase
  useEffect(() => {
    setContext(initializeFirebase(context, firebaseConfig));
  }, []);

  useEffect(() => {
    onAuthStateChanged((user) => {
      const newContext = { ...context };
      newContext.user = user;
      setContext(newContext);
    }).then((handle) => setHandle(handle));

    return () => {
      handle?.remove();
    };
  }, []);

  return (
    <TaroreadNativeContext.Provider value={context}>
      {props.children}
    </TaroreadNativeContext.Provider>
  );
};

export { TaroreadNativeContext, TaroreadNativeBridge };
