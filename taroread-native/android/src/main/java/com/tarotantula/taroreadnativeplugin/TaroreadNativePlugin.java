package com.tarotantula.taroreadnativeplugin;

import android.content.Intent;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;

import com.getcapacitor.*;
import com.getcapacitor.annotation.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

@CapacitorPlugin(name = "TaroreadNative")
public class TaroreadNativePlugin extends Plugin {

    @PluginMethod()
    public void signInWithGoogle(PluginCall call) {
        try {
            Intent firebaseIntent = new Intent(getContext(), FirebaseBActivity.class);
            startActivityForResult(call, firebaseIntent, "signInWithGoogleResult");
        } catch (Exception e) {
            call.reject("Couldn't complete google sign-in intent", e);
        }
    }

    @PluginMethod()
    public void signOut(PluginCall call) {
        try {
            FirebaseAuth.getInstance().signOut();
            call.resolve();
        } catch (Exception e) {
            call.reject("Couldn't sign-out", e);
        }
    }

    @PluginMethod()
    public void getUser(PluginCall call) {
        try {
            FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

            JSObject response = new JSObject();
            if (user != null) {
                response.put("displayName", user.getDisplayName());
                response.put("email", user.getEmail());
                response.put("photoURL", user.getPhotoUrl());
                call.resolve(response);
            } else {
                call.resolve(null);
            }
        } catch (Exception e) {
            call.reject("Couldn't get the current user", e);
        }
    }

    @ActivityCallback()
    private void signInWithGoogleResult(PluginCall call, ActivityResult result) {
        try {
            Intent resultIntent = result.getData();
            String displayName = resultIntent.getStringExtra("displayName");
            String email = resultIntent.getStringExtra("email");
            String photoUrl = resultIntent.getStringExtra("photoUrl");

            JSObject response = new JSObject();
            response.put("displayName", displayName);
            response.put("email", email);
            response.put("photoURL", photoUrl);
            call.resolve(response);
        } catch (Exception e) {
            call.reject("Couldn't handle result of sign-in intent", e);
        }
    }
}
