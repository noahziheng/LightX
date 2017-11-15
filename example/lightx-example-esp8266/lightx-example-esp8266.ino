#include <ESP8266WiFi.h>
int status = WL_IDLE_STATUS;

WiFiServer server(5000);
WiFiClient client;

int t = -1;
byte buf_t = 0xFF;
boolean stop_f = false;

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
  if(client.connected() != t) {
    t = client.connected();
    Serial.print(t);
  }
  if (!client.connected()) {
    // try to connect to a new client
    client = server.available();
  } else {
    // read data from the connected client
    if (client.available())
    {
      byte buf = client.read();
      buf_t = buf;
      Serial.write(buf);
      if(buf == 0x44 && buf_t == 0x00) {
        stop_f = true;
      }
      if(buf == 0xFA && stop_f) {
        stop_f = false;
        client.flush();
        Serial.flush();
        client.stop();
        return;
      }
    }
    if (Serial.available())
    {
      client.write(Serial.read());
    }
  }
}
