package com.bloom.server.indexer;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


//to deploy: gcloud functions deploy treeSaver --trigger-http --entry-point com.bloom.server.indexer.TreeSaver --runtime java11 --allow-unauthenticated
public class TreeSaver implements HttpFunction {
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
            ArrayList<Object> nodes = new ArrayList<>();
            int layerDepth = 0;
            int id = 0;
            for(JsonElement _layer : requestJson.get("layers").getAsJsonArray()) {
                JsonArray layer = _layer.getAsJsonArray();
                for(JsonElement _node : layer) {
                    JsonObject node = _node.getAsJsonObject();
                    Map<String, Object> nodeToSave = new HashMap<>();
                    nodeToSave.put("layer", Integer.toString(layerDepth));
                    nodeToSave.put("id", node.get("id").getAsString());
                    nodeToSave.put("song_id", node.get("song_id").getAsString());
                    nodeToSave.put("album_cover", node.get("album_cover").getAsString());
                    nodeToSave.put("parent", node.get("parent").getAsString());
                    ArrayList<String> children = new ArrayList<String>();
                    for(JsonElement child : node.get("children").getAsJsonArray()) {
                        children.add(child.getAsString());
                    }
                    nodeToSave.put("children", children);
                    nodeToSave.put("attribute", node.get("attribute").getAsInt());
                    nodeToSave.put("song_name", node.get("song_name").getAsString());
                    nodes.add(nodeToSave);
                }
                layerDepth++;
            }
            
            //TODO: actually get specific tree
            DocumentReference treeRef = db.document("users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK");
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("name", "Metal");
            data.put("nodes", nodes);
            data.put("numNodes", id);
            data.put("numLayers", layerDepth);
            treeRef.set(data).get();          
            response.getWriter().write("success!");
        } else {
            response.setStatusCode(HttpURLConnection.HTTP_UNSUPPORTED_TYPE);
            return;
        }
    }
    
}