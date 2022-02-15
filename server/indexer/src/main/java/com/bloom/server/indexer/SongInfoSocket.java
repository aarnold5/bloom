package com.bloom.server.indexer;

import java.io.Console;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.JsonParseException;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class SongInfoSocket implements HttpFunction {
    private static final Logger logger = Logger.getLogger(SongInfoSocket.class.getName());

    private static final Gson gson = new Gson();
    @Override
    public void service(HttpRequest request, HttpResponse response) throws Exception {

        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(credentials).setProjectId("bloom-838b5").build();
        if(FirebaseApp.getApps().isEmpty())
            FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();
        //check url parameters for "name" field
        //"world" is default value
        String contentType = request.getContentType().orElse("");
        if(contentType.equals("application/json")) {
            
            JsonElement requestParsed = gson.fromJson(request.getReader(), JsonElement.class);
            JsonObject requestJson = requestParsed.getAsJsonObject();
            PrintWriter writer = new PrintWriter((response.getWriter()));
            writer.printf("ID: %s\n", requestJson.get("id").getAsString());
            
            String id = requestJson.get("id").getAsString();
            String name = requestJson.get("name").getAsString();
            String sanitizedTrackName = name.toLowerCase();

            Map<String, Object> docData = new HashMap<String, Object>();
            Map<String, Object> indexableSongData = new HashMap<>();
            helperDouble(docData, "duration_ms", requestJson);
            docData.put("href", requestJson.get("href").getAsString());
            docData.put("id", requestJson.get("id").getAsString());
            indexableSongData.put("id", requestJson.get("id").getAsString());
            docData.put("name", requestJson.get("name").getAsString());
            indexableSongData.put("name", requestJson.get("name").getAsString());
            helperDouble(docData, "popularity", requestJson);
            docData.put("uri", requestJson.get("uri").getAsString());
            helperDouble(docData, "danceability", requestJson);
            helperDouble(docData, "energy", requestJson);
            helperDouble(docData, "key", requestJson);
            helperDouble(docData, "loudness", requestJson);
            helperDouble(docData, "mode", requestJson);
            helperDouble(docData, "speechiness", requestJson);
            helperDouble(docData, "acousticness", requestJson);
            helperDouble(docData, "instrumentalness", requestJson);
            helperDouble(docData, "liveness", requestJson);
            helperDouble(docData, "valence", requestJson);
            helperDouble(docData, "tempo", requestJson);
            helperDouble(docData, "time_signature", requestJson);   
            ApiFuture<WriteResult> future = db.collection("songs").document(id).set(docData);
            
            Map<String, Object> nextMap = new HashMap<>();
            nextMap.put("type", "path");
            //add to index
            
            String path = "index";
            for(char c : sanitizedTrackName.toCharArray()) {
                if(c == '.') {
                    path = path + "/next/dot";
                }
                else {
                    path = path + "/next/" + c;
                }
            }
            path = path + "/" + id;
            response.getWriter().write("Path: " + path + "\n");
            ApiFuture<WriteResult> future1 = db.document(path).set(indexableSongData);
            response.getWriter().write("Indexed song: " + name + "\n    where ID = " + id + "\n        update time: " + future1.get().getUpdateTime() + "\n");
        } else {
            response.setStatusCode(HttpURLConnection.HTTP_UNSUPPORTED_TYPE);
        }

    }

    private void helperDouble(Map<String, Object> docData, String paramName, JsonObject requestJson) {
        docData.put(paramName, requestJson.get(paramName).getAsDouble());
    }
}
