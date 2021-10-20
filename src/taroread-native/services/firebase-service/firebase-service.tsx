import { TaroreadNative } from "taroread-native";
import { BridgeState } from "../../bridge-state/bridge-state";

const initialize = (state: BridgeState, config: any) => {
  TaroreadNative.initialize(config);
  return state;
};

export { initialize };
