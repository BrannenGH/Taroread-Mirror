import React, { useContext } from "react";
import { BridgeState } from "../bridge-state/bridge-state";
import { TaroreadNativeContext } from "../taroread-native";
import PropTypes from "prop-types";
import { TaroreadUser } from "taroread-native";
import {
  signOut,
  refreshUser,
  signInWithGoogle,
} from "../services/authentication-service/authentication-service";
import { useState } from "./base-hooks";

const useUser: () => TaroreadUser | null = () => {
  const state = useState();

  return state.user;
};

const useSignOut: () => () => Promise<void> = () => {
  const state = useState();

  // TODO: Make context aware.
  return () => signOut();
};

const useRefreshUser: () => () => void = () => {
  const state = useState();

  // TODO: Make context aware.
  return () => refreshUser();
};

const useSignInWithGoogle: () => () => Promise<TaroreadUser | null> = () => {
  const state = useState();

  // TODO: Make context aware.
  return () => signInWithGoogle();
};

export { useUser, useSignOut, useRefreshUser, useSignInWithGoogle };
