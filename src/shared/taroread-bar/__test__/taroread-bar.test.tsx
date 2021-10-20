import React from "react";
import { render, waitFor } from "@testing-library/react";
import { TaroreadBar } from "../taroread-bar";
import { BrowserRouter, Router } from "react-router-dom";
import config from "../../../firebase-config.json";
import { TaroreadNativeBridge } from "../../../taroread-native/taroread-native";
import "@testing-library/jest-dom";
import { useUser } from "../../../taroread-native/hooks/authentication-hooks";

const buildMockContext = (innerElement: JSX.Element) => {
  return (
    <TaroreadNativeBridge>
      <BrowserRouter>{innerElement}</BrowserRouter>
    </TaroreadNativeBridge>
  );
};

const resizeToMobile = (window: any) => {
  window.innerWidth = 375;
  window.innerHeight = 812;
};

let mockCurrentUser: any = null;

jest.mock("../../../taroread-native/hooks/authentication-hooks", () => {
  const originalModule = jest.requireActual(
    "../../../taroread-native/hooks/authentication-hooks"
  );

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    useUser: () => mockCurrentUser,
  };
});

describe("Taroread Bar", () => {
  it("renders a logo with proper alt text", async () => {
    const taroreadBar = render(
      buildMockContext(
        <TaroreadBar
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
      )
    );

    await waitFor(() => {
      const logo = taroreadBar.getByAltText("Taroread logo");
      expect(logo).toBeInTheDocument();
    });
  });

  it("renders a logged out account circle when logged out", async () => {
    mockCurrentUser = null;

    const taroreadBar = render(
      buildMockContext(
        <TaroreadBar
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
      )
    );

    await waitFor(() => {
      const logo = taroreadBar.getByLabelText("Logged out user");
      expect(logo).toBeInTheDocument();
    });
  });

  it("renders a logged in account circle when logged in", async () => {
    mockCurrentUser = {
      uid: 0,
      displayName: "John Appleseed",
      email: "test@tarotantula.com",
      photoURL: "https://tarotantula.com",
    };

    const taroreadBar = render(
      buildMockContext(
        <TaroreadBar
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
      )
    );

    expect(useUser()?.displayName).toBe("John Appleseed");

    await waitFor(() => {
      const logo = taroreadBar.getByLabelText("John Appleseed");
      expect(logo).toBeInTheDocument();
    });
  });

  it("does display links on desktop", async () => {
    const taroreadBar = render(
      buildMockContext(
        <TaroreadBar
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
      )
    );

    waitFor(() => {
      const link = taroreadBar.getByText("Learn");
      expect(link).toBeInTheDocument();
    });
  });

  it("doesn't display links on mobile", async () => {
    const taroreadBar = render(
      buildMockContext(
        <TaroreadBar
          setAccountDrawerVisible={() => {}}
          setNavigationDrawerVisible={() => {}}
        />
      )
    );

    resizeToMobile(window);

    waitFor(() => {
      const link = taroreadBar.getByText("Learn");
      expect(link).not.toBeInTheDocument();
    });
  });
});
