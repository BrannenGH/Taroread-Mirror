import React, { useContext } from "react";
import { BridgeState } from "../bridge-state/bridge-state";
import { TaroreadNativeContext } from "../taroread-native";
import PropTypes from "prop-types";
import { TaroreadJournal, TaroreadUser } from "taroread-native";
import {
  getJournals,
  getJournal,
  updateJournal,
  addJournal,
  deleteJournal,
} from "../services/journal-service/journal-service";
import { useState } from "./base-hooks";

const useGetJournals: () => (start: number) => Promise<TaroreadJournal[]> =
  () => {
    const state = useState();

    return (start: number) => getJournals(state, start);
  };

const useGetJournal: () => (id: string) => Promise<TaroreadJournal> = () => {
  const state = useState();

  return (id: string) => getJournal(state, id);
};

const useUpdateJournal: () => (
  id: string,
  journal: TaroreadJournal
) => Promise<void> = () => {
  const state = useState();

  return (id: string, journal: TaroreadJournal) =>
    updateJournal(state, id, journal);
};

const useAddJournal: () => () => Promise<string> = () => {
  const state = useState();

  return () => addJournal(state);
};

const useDeleteJournal: () => (id: string) => Promise<void> = () => {
  const state = useState();

  return (id: string) => deleteJournal(state, id);
};

export {
  useGetJournals,
  useGetJournal,
  useUpdateJournal,
  useAddJournal,
  useDeleteJournal,
};
