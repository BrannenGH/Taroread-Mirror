import React, { useEffect, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { signInWithGoogle } from "../authentication-service/authentication-service";
import { TaroreadUser } from "taroread-native";
import PropTypes from "prop-types";
import "./signin-with-google-button.css";

const SignInWithGoogleButton = (props: any) => {
  return (
    <ButtonBase
      onClick={() =>
        signInWithGoogle().then((user: TaroreadUser | null) => {
          props.onLogin(user);
        })
      }
    >
      <img
        className="google-signin-button"
        src="signin/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png"
        alt="Sign in with Google"
      />
    </ButtonBase>
  );
};

SignInWithGoogleButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export { SignInWithGoogleButton };
