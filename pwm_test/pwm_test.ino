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

void setup() {
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
  forward(150, 150);
}

void forward(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(4000);
}

void backward(float speed) {
  analogWrite(enA, speed);
  analogWrite(enB, speed);
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(250);
}

void left(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(250);
}

void right(float speedA, float speedB) {
  analogWrite(enA, speedA);
  analogWrite(enB, speedB);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(250);
}

void stop_motor() {
  analogWrite(enA, 0);
  analogWrite(enB, 0);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
  delay(250);
}
