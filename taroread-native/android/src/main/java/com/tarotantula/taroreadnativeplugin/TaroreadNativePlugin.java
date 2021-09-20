package com.tarotantula.taroreadnativeplugin;

import android.content.Intent;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;

import com.getcapacitor.*;
import com.getcapacitor.annotation.*;

@CapacitorPlugin(name = "TaroreadNative")
public class TaroreadNativePlugin extends Plugin {

    @PluginMethod()
    public void signInWithGoogle(PluginCall call) {
        Intent firebaseIntent = new Intent(getContext(), FirebaseBActivity.class);
        startActivityForResult(call, firebaseIntent, "signInWithGoogleResult");
    }

    @ActivityCallback()
    private void signInWithGoogleResult(PluginCall call, ActivityResult result) {
        ;
    }
}
