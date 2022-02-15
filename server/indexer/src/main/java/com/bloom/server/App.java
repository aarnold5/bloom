package com.bloom.server;
import java.util.List;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.bloom.server.indexer.SongInfoSocket;
/**
 * Hello world!
 *
 */
public class App 
{
    private static final Gson gson = new Gson();
    public static void main( String[] args )
    {
        try {
            // Use the application default credentials
            GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
            FirebaseOptions options = FirebaseOptions.builder().setCredentials(credentials).setProjectId("bloom-838b5").build();
            FirebaseApp.initializeApp(options);
            Firestore db = FirestoreClient.getFirestore();
            System.out.println( "Hello World!" );

            ApiFuture<QuerySnapshot> query = db.collection("users").get();
            QuerySnapshot querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            for(QueryDocumentSnapshot document : documents) {
                System.out.println("User " + document.getId());
                System.out.println("First: " + document.getString("first"));
            }

            String name = null;
            JsonObject body = gson.fromJson("{\"name\":\"Jane\"}", JsonObject.class);
            if(body.has("name"))
                name = body.get("name").getAsString();
            System.out.println("got: " + name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
