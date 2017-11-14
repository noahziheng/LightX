#include <ESP8266WiFi.h>
int status = WL_IDLE_STATUS;

WiFiServer server(5000);

void handleTCPServer ();

void setup() {
  Serial.begin(9600);
  status = WiFi.softAP("LightX-1");
  server.begin();
}

// the loop function runs over and over again forever
void loop() {
  handleTCPServer();
}

void handleTCPServer () {
  WiFiClient client = server.available(); 
  if (client)
  {
    while (client.connected())
    {
      if (client.available())
      {
        Serial.write(client.read());
      }
    }
    delay(1);
    client.stop();
  }
}
