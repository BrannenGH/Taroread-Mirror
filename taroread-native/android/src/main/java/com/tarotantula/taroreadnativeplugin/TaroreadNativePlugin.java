package com.tarotantula.taroreadnativeplugin;

import android.content.Intent;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;

import com.getcapacitor.*;
import com.getcapacitor.annotation.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.*;
import com.google.firebase.auth.FirebaseAuth.*;

@CapacitorPlugin(name = "TaroreadNative")
public class TaroreadNativePlugin extends Plugin {

    @PluginMethod()
    public void initialize(PluginCall call) {
        try {
            FirebaseAuth.getInstance().addAuthStateListener(new AuthStateListener() {
                @Override
                public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                    notifyListeners("onAuthStateChanged", buildJsonFromUser(firebaseAuth.getCurrentUser()));
                }
            });
            call.resolve();
        } catch (Exception e) {
            call.reject("Couldn't initialize", e);
        }
    }

    @PluginMethod()
    public void signInWithGoogle(PluginCall call) {
        try {
            Intent firebaseIntent = new Intent(getContext(), GoogleSignInActivity.class);
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
    public void refreshUser(PluginCall call) {
        try {
            notifyListeners("onAuthStateChanged", buildJsonFromUser(FirebaseAuth.getInstance().getCurrentUser()));
            call.resolve();
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

    private JSObject buildJsonFromUser(FirebaseUser user) {
        if (user != null) {
            JSObject response = new JSObject();
            response.put("displayName", user.getDisplayName());
            response.put("email", user.getEmail());
            response.put("photoURL", user.getPhotoUrl());
            return response;
        } else {
            return null;
        }
    }

    /*

      onAuthStateChanged(func: (user: TaroreadUser) => void): void;
  getReadings(): Promise<any>;
  getReading(id: number): Promise<any>;
  deleteReading(id: number): Promise<any>;
  updateReading(id: number, reading: any): Promise<any>;
  addReading(reading: any): Promise<any>;
}
     */
}
