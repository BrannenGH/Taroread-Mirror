import React, { useEffect, useState } from "react";
import { registerPlugin } from "@capacitor/core";
import { Box, Button, Drawer } from "@material-ui/core";

const AccountDrawerNative = (props: any) => {
  const firebaseB: any = registerPlugin("FirebaseB");

  return (
    <Drawer anchor="right" open={props.isOpen}>
      <Box>
        <Button onClick={firebaseB.signInWithGoogle}>Sign in</Button>
      </Box>
    </Drawer>
  );
};

export { AccountDrawerNative };
