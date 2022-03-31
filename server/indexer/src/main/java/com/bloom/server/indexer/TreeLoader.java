package com.bloom.server.indexer;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Document;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;


//to deploy: gcloud functions deploy treeLoader --trigger-http --entry-point com.bloom.server.indexer.TreeLoader --runtime java11 --allow-unauthenticated
public class TreeLoader implements HttpFunction{
    private static final Gson gson = new Gson();
    @Override
    public void service(HttpRequest request, HttpResponse response) throws Exception {
        response.appendHeader("Access-Control-Allow-Origin", "*");
        if("OPTIONS".equals(request.getMethod())) {
            response.appendHeader("Access-Control-Allow-Methods", "POST");
            response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
            response.appendHeader("Access-Control-Max-Age", "3600");
            response.setStatusCode(HttpURLConnection.HTTP_NO_CONTENT);
            return;
        }

        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(credentials).setProjectId("bloom-838b5").build();
        if(FirebaseApp.getApps().isEmpty())
            FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();

        if(request.getContentType().orElse("").equals("application/json")) {
            JsonObject requestJson = gson.fromJson(request.getReader(), JsonElement.class).getAsJsonObject();
            System.out.println("gotten data:\n" + requestJson.toString());
            JsonObject returnJson = new JsonObject();

            //TODO: actually get specific tree
            //String treeName = requestJson.get("tree_name").getAsString();

            DocumentReference treeRef = db.document("users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK");

            DocumentSnapshot treeSnap = treeRef.get().get();
            List<Map<String, Object>> nodes = (List<Map<String, Object>>) treeSnap.get("nodes");

            JsonArray layersJson = new JsonArray();
            for(int i = 0; i < treeSnap.get("numLayers", Integer.class); i++) {
                layersJson.add(new JsonArray());
            }
            for(Map<String, Object> node : nodes) {
                int layer = Integer.parseInt(node.get("layer").toString());
                JsonObject newNode = new JsonObject();
                newNode.addProperty("id", node.get("id").toString());
                newNode.addProperty("song_id", node.get("song_id").toString());
                newNode.addProperty("album_cover", node.get("album_cover").toString());
                newNode.addProperty("parent", node.get("parent").toString());
                JsonArray children = new JsonArray();
                for(String child : (List<String>) node.get("children")) {
                    children.add(child);
                }
                newNode.add("children", children);
                newNode.addProperty("attribute", (Long) node.get("attribute"));
                newNode.addProperty("song_name", node.get("song_name").toString());
                layersJson.get(layer).getAsJsonArray().add(newNode);
            }

            returnJson.add("layers", layersJson);
            response.getWriter().write(returnJson.toString());
        } else {
            response.setStatusCode(HttpURLConnection.HTTP_UNSUPPORTED_TYPE);
            return;
        }
    }
    
}
