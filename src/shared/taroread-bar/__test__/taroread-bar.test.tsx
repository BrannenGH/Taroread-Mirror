import React from "react";
import { render, waitFor } from "@testing-library/react";
import { TaroreadBar } from "../taroread-bar";
import { BrowserRouter, Router } from "react-router-dom";
import { TaroreadNative } from "../../../../taroread-native/dist/esm";
import config from "../../../firebase-config.json";

/* const buildMockContext = (innerElement: JSX.Element) => {
  // Need to refactor in future to remove dependencies
  try {
    TaroreadNative.initialize(config)
  } catch (err) {
    // no op
  }

  return (
    <BrowserRouter>
      {innerElement}
    </BrowserRouter>
  );
}


it('renders a logo with proper alt text', async () => {
  const taroreadBar = render(buildMockContext(
        <TaroreadBar 
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
  ));

  await waitFor(() => {
    const logo = taroreadBar.getByAltText("Taroread logo");
    expect(logo).toBeInTheDocument();
  });
});

it('renders an account circle', async () => {
   const taroreadBar = render(buildMockContext(
      <TaroreadBar 
        setAccountDrawerVisible={() => {}}
        setNavigationDrawerVisible={() => {}}
      />));

    await waitFor(() => {
      const logo = taroreadBar.getByAltText("Logged out user");
      expect(logo).toBeInTheDocument(); 
    });
}); */