package com.tarotantula.taroreadnativeplugin;

import android.content.Intent;
import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;
import com.getcapacitor.*;
import com.getcapacitor.annotation.*;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.*;
import com.google.firebase.auth.FirebaseAuth.*;
import com.google.firebase.database.*;
import com.google.firebase.database.DatabaseReference;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;

@CapacitorPlugin(name = "TaroreadNative")
public class TaroreadNativePlugin extends Plugin {

    @PluginMethod
    public void initialize(PluginCall call) {
        try {
            FirebaseAuth
                .getInstance()
                .addAuthStateListener(
                    new AuthStateListener() {
                        @Override
                        public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                            notifyListeners("onAuthStateChanged", buildJsonFromUser(firebaseAuth.getCurrentUser()));
                        }
                    }
                );
            database = FirebaseDatabase.getInstance().getReference();
            call.resolve();
        } catch (Exception e) {
            call.reject("Couldn't initialize", e);
        }
    }

    @PluginMethod
    public void signInWithGoogle(PluginCall call) {
        try {
            Intent firebaseIntent = new Intent(getContext(), GoogleSignInActivity.class);
            startActivityForResult(call, firebaseIntent, "signInWithGoogleResult");
        } catch (Exception e) {
            call.reject("Couldn't complete google sign-in intent", e);
        }
    }

    @PluginMethod
    public void signOut(PluginCall call) {
        try {
            FirebaseAuth.getInstance().signOut();
            call.resolve();
        } catch (Exception e) {
            call.reject("Couldn't sign-out", e);
        }
    }

    @PluginMethod
    public void refreshUser(PluginCall call) {
        try {
            notifyListeners("onAuthStateChanged", buildJsonFromUser(FirebaseAuth.getInstance().getCurrentUser()));
            call.resolve();
        } catch (Exception e) {
            call.reject("Couldn't get the current user", e);
        }
    }

    @ActivityCallback
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
            response.put("uid", user.getUid());
            response.put("displayName", user.getDisplayName());
            response.put("email", user.getEmail());
            response.put("photoURL", user.getPhotoUrl());
            return response;
        } else {
            return null;
        }
    }

    // Taroread Journal methods
    // TODO: Split out into seperate objects

    private DatabaseReference database;

    @PluginMethod
    public void getReadings(PluginCall call) {
        database
            .child("journals")
            .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
            .get()
            .addOnCompleteListener(
                new OnCompleteListener<DataSnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<DataSnapshot> task) {
                        JSObject returnWrapper = new JSObject();
                        returnWrapper.put(
                            "readings",
                            snapshotsToJson((HashMap<String, HashMap<String, Object>>) task.getResult().getValue())
                        );
                        call.resolve(returnWrapper);
                    }
                }
            );
    }

    @PluginMethod
    public void getReading(PluginCall call) {
        String id = call.getData().getString("id");

        if (id != null) {
            database
                .child("journals")
                .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
                .child(id)
                .get()
                .addOnCompleteListener(
                    new OnCompleteListener<DataSnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<DataSnapshot> task) {
                            call.resolve(readingSnapshotToJson(id, (HashMap<String, Object>) task.getResult().getValue()));
                        }
                    }
                );
        } else {
            call.reject("ID cannot be null");
        }
    }

    @PluginMethod
    public void deleteReading(PluginCall call) {
        String id = call.getData().getString("id");

        database
            .child("journals")
            .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
            .child(id)
            .removeValue(
                (error, ref) -> {
                    call.resolve();
                }
            );
    }

    @PluginMethod
    public void updateReading(PluginCall call) {
        String id = call.getData().getString("id");
        JSObject reading = call.getData().getJSObject("reading");

        try {
            // Reformat the cards to something Firebase knows how to serialize
            database
                .child("journals")
                .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
                .child(id)
                .updateChildren(convertToFirebase(reading));
        } catch (Exception e) {
            call.reject("Failed to update", e);
        }
    }

    @PluginMethod
    public void addReading(PluginCall call) {
        JSObject reading = call.getData().getJSObject("reading");

        try {
            database
                .child("journals")
                .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
                .push()
                .updateChildren(convertToFirebase(reading));
        } catch (Exception e) {
            call.reject("Couldn't add reading, e");
        }
    }

    private JSArray snapshotsToJson(HashMap<String, HashMap<String, Object>> readings) {
        Iterator<String> it = readings.keySet().iterator();
        JSArray result = new JSArray();

        while (it.hasNext()) {
            String key = it.next();
            HashMap<String, Object> reading = readings.get(key);
            result.put(readingSnapshotToJson(key, reading));
        }

        return result;
    }

    private JSObject readingSnapshotToJson(String id, HashMap<String, Object> reading) {
        JSObject result = new JSObject();

        result.put("id", id);
        result.put("cards", new JSArray((List<Integer>) reading.get("cards")));
        result.put("date", reading.get("date"));
        result.put("description", reading.get("description"));
        result.put("title", reading.get("title"));

        return result;
    }

    private Map<String, Object> jsonToMap(JSObject js) {
        Map<String, Object> result = new HashMap<String, Object>();

        Iterator<String> keys = js.keys();

        while (keys.hasNext()) {
            String key = keys.next();

            try {
                result.put(key, js.get(key));
            } catch (Exception e) {
                // no op

            }
        }

        return result;
    }

    private List<Integer> parseCards(JSONArray array) throws JSONException {
        List<Integer> cards = new ArrayList<Integer>();

        // Iterate through the array
        for (int i = 0; i < array.length(); i++) {
            cards.add(array.getInt(i));
        }

        return cards;
    }

    private Map<String, Object> convertToFirebase(JSObject reading) throws JSONException {
        Map<String, Object> fieldsToUpdate = jsonToMap(reading);
        if (reading.has("cards")) {
            fieldsToUpdate.put("cards", parseCards((JSONArray) fieldsToUpdate.get("cards")));
        }

        return fieldsToUpdate;
    }
}
