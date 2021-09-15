package com.tarotantula.taroread;

import android.content.Intent;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "FirebaseB")
public class FirebaseBPlugin extends Plugin {

    @Override
    public void load() {
    }

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
