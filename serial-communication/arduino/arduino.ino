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
  directionFromDeflection();
}

void directionFromDeflection() {
  while(ArduinoUno.available()>0) {
      float userDeflection = ArduinoUno.parseFloat();
    
      if(ArduinoUno.read()== '\n') {  
        float relativeDeflection = userDeflection - readCartDeflection();
        
        if(relativeDeflection < 0) {
          relativeDeflection += (360);
        }

        if(relativeDeflection > (360)) {
          relativeDeflection -= (360);
        }

        Serial.print("Deflection: ");
        Serial.print(relativeDeflection);
        Serial.print(" - ");
        Serial.print("Direction: ");
        computeDirection(relativeDeflection);
      }
   }
}

void computeDirection(float heading) {
  if(heading > 338 || heading < 22) {
    Serial.println("NORTH");
    forward(150);
  }

  if(heading > 22 && heading < 68) {
    Serial.println("NORTH-EAST");
    soft_right(100, 125);
  }

  if(heading > 68 && heading < 113) {
    Serial.println("EAST");
    right(130);
  }

  if(heading > 248 && heading < 293) {
    Serial.println("WEST");
    left(125);
  }

  if(heading > 293 && heading < 338) {
    Serial.println("NORTH-WEST");
    soft_left(125, 110);
  }
}

double magnetometerOutput(MechaQMC5883 qmc) {
  int x, y, z;

  qmc.read(&x,&y,&z);
  double headingInRadians = atan2((double)x, (double)y) + declinationAngle;  
  return headingInRadians;
}

float readCartDeflection() {
  float headingInRadians = (float)magnetometerOutput(qmc);
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
  delay(70);
}

void backward(float speed) {
  analogWrite(enA, speed);
  analogWrite(enB, speed);
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(70);
}

void left(float speed) {
  analogWrite(enA, speed);
  analogWrite(enB, 0);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
  delay(70);
}

void right(float speed) {
  analogWrite(enA, 0);
  analogWrite(enB, speed);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(70);
}

void soft_left(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(70);
}

void soft_right(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(70);
}

void stop_motor() {
  analogWrite(enA, 0);
  analogWrite(enB, 0);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
  delay(70);
}
