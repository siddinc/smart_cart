#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
int i = 10;
SoftwareSerial NodeMCU(3,1); // RX -> 3 TX-> 1

void setup(){
  Serial.begin(9600);
  NodeMCU.begin(4800);
  pinMode(3,INPUT);
  pinMode(1,OUTPUT);
}

void loop(){

  NodeMCU.print(i);
  NodeMCU.println("\n");
  i = i + 1;
  delay(1000);
}
