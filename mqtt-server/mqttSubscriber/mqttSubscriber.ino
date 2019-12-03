#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>

const String ssid = "Jarvis";
const String password = "sidrox54";
const char* cartIP = "192.168.43.111";

const char* mqttServerIP = "192.168.43.113";
const int mqttServerPort = 1883;

const char* topic = "cart/192.168.43.111";

IPAddress ip(192, 168, 43, 111);
IPAddress gateway(192, 168, 43, 1);
IPAddress subnet(255, 255, 255, 0);

WiFiClient esp8266Client;
PubSubClient client(esp8266Client);
SoftwareSerial NodeMCU(3,1);

void setup() {
  Serial.begin(9600);
  NodeMCU.begin(4800);
  
  pinMode(3,INPUT);
  pinMode(1,OUTPUT);
  
  WiFi.mode(WIFI_STA);
  WiFi.config(ip, gateway, subnet);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  
  Serial.println("");
  String wifiStatus = "Connected to: " + ssid;
  Serial.println(wifiStatus);
  Serial.print("Cart IP address: ");
  Serial.println(WiFi.localIP());
  
  client.setServer(mqttServerIP, mqttServerPort);
  client.setCallback(callback);
}

void callback(char* topic, byte* payload, unsigned int length) {
  String payloadString = "";
  Serial.print("Payload received: ");
  
  for(int i=0; i<length; i++) {
    Serial.print((char)payload[i]);
    payloadString += (char)payload[i];
  }
  
  Serial.print(" on topic: ");
  Serial.println(topic);
  NodeMCU.print(payloadString.toDouble());
  NodeMCU.print("\n");
}

void reconnect() {
  Serial.println("Connecting to MQTT Server...");
  
  while (!client.connected()) {
    if (client.connect(cartIP)) {
      Serial.println("Connected to MQTT Server");
      client.subscribe(topic);
    }else {
      Serial.print("Connection to MQTT Server failed with state: ");
      Serial.println(client.state());
      Serial.println("Retrying to connect after 3 seconds...");
      delay(3000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  
  client.loop();
}
