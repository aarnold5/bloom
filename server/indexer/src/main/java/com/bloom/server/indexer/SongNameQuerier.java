package com.bloom.server.indexer;

import java.util.logging.Logger;

import java.io.Console;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Stack;
import java.util.logging.Logger;

import javax.net.ssl.HttpsURLConnection;

import com.fasterxml.jackson.core.JsonParseException;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;


//to deploy (from 'indexer' directory): gcloud functions deploy songnamequerier --trigger-http --entry-point com.bloom.server.indexer.SongNameQuerier --runtime java11 --allow-unauthenticated
//

public class SongNameQuerier implements HttpFunction {
    private static final Logger logger = Logger.getLogger(SongNameQuerier.class.getName());
    private static final Gson gson = new Gson();
    @Override
    public void service(HttpRequest request, HttpResponse response) throws Exception {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(credentials).setProjectId("bloom-838b5").build();
        if(FirebaseApp.getApps().isEmpty())
            FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();

        if(request.getContentType().orElse("").equals("application/json")) {
            JsonElement requestParsed = gson.fromJson(request.getReader(), JsonElement.class);
            JsonObject requestJson = requestParsed.getAsJsonObject();

            String queryStringSanitized = requestJson.get("query").getAsString().toLowerCase();

            

            Query reference = db.collection("songs")
            .whereArrayContains("indexing", queryStringSanitized).limit(10);
            List<QueryDocumentSnapshot> results = reference.get().get().getDocuments();
            JsonArray resultsArray = new JsonArray();
            for (QueryDocumentSnapshot result : results) {
                JsonObject songJson = new JsonObject();
                songJson.add("name", new JsonPrimitive(result.getString("name")));
                songJson.add("id", new JsonPrimitive(result.getString("id")));
                songJson.add("album_cover", new JsonPrimitive(result.getString("album_cover")));
                resultsArray.add(songJson);
            }
            JsonObject responseJson = new JsonObject();
            responseJson.add("results", resultsArray);
            response.setContentType("application/json");
            response.getWriter().write(responseJson.toString());
        } else {
            response.setStatusCode(HttpURLConnection.HTTP_UNSUPPORTED_TYPE);
            return;
        }
    }

    private JsonElement songToElement(String id, String name) {
        JsonObject ret = new JsonObject();
        ret.addProperty("id", id);
        ret.addProperty("name", name);
        return ret;
    }
    
}
