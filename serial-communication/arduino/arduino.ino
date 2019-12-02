#include <SoftwareSerial.h>
SoftwareSerial ArduinoUno(0,1); // RX, TX NodeMCU RX--> TX   TX--> RX

void setup(){
  
  Serial.begin(9600);
  ArduinoUno.begin(4800);

}

void loop(){
  
  while(ArduinoUno.available()>0){
  float val = ArduinoUno.parseFloat();
  if(ArduinoUno.read()== '\n'){
  Serial.println(val);
  }
}
delay(1000);
}
