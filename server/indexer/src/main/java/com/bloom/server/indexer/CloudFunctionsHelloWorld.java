package com.bloom.server.indexer;

import java.io.PrintWriter;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class CloudFunctionsHelloWorld implements HttpFunction {
  private static final Gson gson = new Gson();
  @Override
  public void service(HttpRequest request, HttpResponse response)
      throws Exception {
    JsonElement requestParsed = gson.fromJson(request.getReader(), JsonElement.class);
    JsonObject requestJson = requestParsed.getAsJsonObject();
    PrintWriter writer = new PrintWriter(response.getWriter());
    writer.printf("Hello %s!", requestJson.get("name").getAsString());
  }
}