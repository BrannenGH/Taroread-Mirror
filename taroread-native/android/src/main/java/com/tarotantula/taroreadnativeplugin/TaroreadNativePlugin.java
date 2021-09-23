package com.tarotantula.taroreadnativeplugin;

import android.content.Intent;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;

import com.getcapacitor.*;
import com.getcapacitor.annotation.*;
import com.google.firebase.auth.FirebaseAuth;

@CapacitorPlugin(name = "TaroreadNative")
public class TaroreadNativePlugin extends Plugin {

    @PluginMethod()
    public void signInWithGoogle(PluginCall call) {
        Intent firebaseIntent = new Intent(getContext(), FirebaseBActivity.class);
        startActivityForResult(call, firebaseIntent, "signInWithGoogleResult");
    }

    @PluginMethod()
    public void signOut(PluginCall call) {
        FirebaseAuth.getInstance().signOut();
        call.resolve();
    }

    @ActivityCallback()
    private void signInWithGoogleResult(PluginCall call, ActivityResult result) {
        Intent resultIntent = result.getData();
        String displayName = resultIntent.getStringExtra("displayName");
        String email = resultIntent.getStringExtra("email");
        String photoUrl = resultIntent.getStringExtra("photoUrl");

        JSObject response = new JSObject();
        response.put("displayName", displayName);
        response.put("email", email);
        response.put("photoURL", photoUrl);
        call.resolve(response);
    }
}
