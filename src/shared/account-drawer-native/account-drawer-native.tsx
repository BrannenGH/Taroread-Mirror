import React, { useEffect, useState } from "react";
import { registerPlugin } from "@capacitor/core";
import { Box, Button, Drawer, Typography } from "@material-ui/core";
import { signInWithGoogle, getUser } from "../authentication-service/authentication-service";
import { TaroreadUser } from "taroread-native";

const AccountDrawerNative = (props: any) => {
  const [user, setUser] = useState<TaroreadUser | null>();

  useEffect(() => {
    getUser()?.then((res: TaroreadUser | null) => {
      setUser(res);
    });
  },[user]);

  const getInnerDrawer = () => {
    if (user === null) {
      return (
        <Box>
          <Button onClick={() => signInWithGoogle().then((user:TaroreadUser | null) => setUser(user))}>Sign in</Button>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography>{user?.displayName ?? "Anonymous User"}</Typography>
        </Box>
      );
    }
  }

  return (
    <Drawer anchor="right" open={props.isOpen}>
      {getInnerDrawer()}
    </Drawer>
  );
};

export { AccountDrawerNative };
