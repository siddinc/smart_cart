#include <SoftwareSerial.h>
#include <Wire.h>
#include <MechaQMC5883.h>

const double declinationAngle = 0.001164;

// Motor A (right motor)
// in2 is forward
// in1 is reverse
int enA = 9;
int in1 = 8;
int in2 = 7;

// Motor B (left motor)
// in4 is forward
// in3 is reverse
int enB = 3;
int in3 = 5;
int in4 = 4;

SoftwareSerial ArduinoUno(0,1);
MechaQMC5883 qmc;

void setup(){
  Serial.begin(9600);
  ArduinoUno.begin(4800);

  Wire.begin(); //A4 --> SDA, A5 --> SCL
  qmc.init();

  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  analogWrite(enA, 255);
  analogWrite(enB, 255);
  
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

void loop() {
   while(ArduinoUno.available()>0) {
      float userDeflection = ArduinoUno.parseFloat();
    
      if(ArduinoUno.read()== '\n') {  
        float relativeDeflection = userDeflection - readCartDeflection();
      }
   }
}

float magnetometerOutput(MechaQMC5883 qmc) {
  int x, y, z;
  float headingInRadians;
  
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

float readCartDeflection() {
  float headingInRadians = magnetometerOutput(qmc);
  float headingInDegrees = (headingInRadians * 180) / PI;
  
  return headingInDegrees;
}


void forward(float speed) {
  analogWrite(enA, speed);
  analogWrite(enB, speed);

  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(1000);
}

void backward(float speed) {
  analogWrite(enA, speed);
  analogWrite(enB, speed);

  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(1000);
}

void left(float speed) {
  analogWrite(enB, speed);

  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(1000);
}

void soft_left(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);

  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(1000);
}

void right(float speed) {
  analogWrite(enA, speed);

  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(1000);
}

void soft_right(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);

  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(1000);
}

void stop_motor() {
  analogWrite(enA, 0);
  analogWrite(enB, 0);
  
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
  delay(1000);
}

void directions(float heading) {
  if (heading > 338 || heading < 22) {
    Serial.println("NORTH");
  //digitalWrite(ledPins[0],HIGH);
    forward(200);
  }

  if (heading > 22 && heading < 68) {
    Serial.println("NORTH-EAST");
  //digitalWrite(ledPins[7],HIGH);
  soft_left(185,100);

  }

  if (heading > 68 && heading < 113) {
    Serial.println("EAST");
   //    digitalWrite(ledPins[6],HIGH);
   left(185);
  }

//  if (heading > 113 && heading < 158)
//  {
//    Serial.println("SOUTH-EAST");
//    digitalWrite(ledPins[5],HIGH);
//  }
//
//  if (heading > 158 && heading < 203)
//  {
//    Serial.println("SOUTH");
//    digitalWrite(ledPins[4],HIGH);
//  }
//
//  if (heading > 203 && heading < 248)
//  {
//    Serial.println("SOTUH-WEST");
//    digitalWrite(ledPins[3],HIGH);
//  }

  if (heading > 248 && heading < 293) {
    Serial.println("WEST");
    right(185);
  }

  if (heading > 293 && heading < 338) {
    Serial.println("NORTH-WEST");
//    digitalWrite(ledPins[1],HIGH);
  soft_right(100,185);
  }  
}
