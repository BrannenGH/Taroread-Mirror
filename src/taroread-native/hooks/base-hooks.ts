import React, { useContext } from "react";
import { BridgeState } from "../bridge-state/bridge-state";
import { TaroreadNativeContext } from "../taroread-native";

const useState: () => BridgeState = () => {
  const state = useContext<BridgeState>(TaroreadNativeContext);

  if (state === undefined) {
    throw new Error(
      "Calling function must be used within a TaroreadNativeContext"
    );
  }

  return state;
};

export { useState };
