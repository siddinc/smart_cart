#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <MechaQMC5883.h>

const String ssid = "Jarvis";
const String password = "sidrox54";
const char* userIP = "192.168.43.110";

const char* mqttServerIP = "192.168.43.113";
const int mqttServerPort = 1883;

const double declinationAngle = 0.001164;
const char* topic = "cart/192.168.43.111";

IPAddress ip(192, 168, 43, 110);
IPAddress gateway(192, 168, 43, 1);
IPAddress subnet(255, 255, 255, 0);

WiFiClient esp8266Client;
PubSubClient client(esp8266Client);

MechaQMC5883 qmc;

void setup() {
  Serial.begin(115200);
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
  Serial.print("User IP address: ");
  Serial.println(WiFi.localIP());
  
  client.setServer(mqttServerIP, mqttServerPort);
  Wire.begin(D1, D2); //SDA=D1 and SCL=D2
  qmc.init();
}

double magnetometerOutput(MechaQMC5883 qmc) {
  int x, y, z;
  double headingInRadians;
  
  qmc.read(&x,&y,&z);
  
  headingInRadians = atan2((double)x, (double)y) + declinationAngle;

  if(headingInRadians < 0) {
    headingInRadians += (2 * PI); 
  }

  if(headingInRadians > (2 * PI)) {
    headingInRadians -= (2 * PI);
  }

  return headingInRadians;
}

void reconnect() {
  Serial.println("Connecting to MQTT Server...");
  
  while (!client.connected()) {
    if (client.connect(userIP)) { 
      Serial.println("Connected to MQTT Server");
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

  double headingInRadians = magnetometerOutput(qmc);
  double headingInDegrees = (headingInRadians * 180) / PI;
  char payloadCharArray[20];
  dtostrf(headingInRadians, 0, 4, payloadCharArray);

  client.publish(topic, payloadCharArray);
  
  Serial.print("Payload: ");
//  Serial.print(headingInRadians);
  Serial.print(headingInDegrees);
  Serial.print(" published on topic: ");
  Serial.println(topic);
  
  client.loop();
  delay(1500);
}
