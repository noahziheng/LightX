#include <SoftwareSerial.h>

#define PIN_LED 13
#define PIN_BTN A1
#define PIN_LEDR 11
#define PIN_LEDB 10
#define PIN_LEDG 9

int t=0;
byte s_buffer[10];
boolean lighton = false;
double brightness = 1.0;
double tempature = 0.5;
SoftwareSerial SoftSerial(8, 7); // RX, TX

void blink();
void checkVar();
void sendState();
void handleData();

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  // set the data rate for the SoftwareSerial port
  SoftSerial.begin(9600);
  delay(1000);
  pinMode(PIN_BTN,INPUT);
  pinMode(PIN_LED,OUTPUT);
  pinMode(PIN_LEDR,OUTPUT);
  pinMode(PIN_LEDB,OUTPUT);
  pinMode(PIN_LEDG,OUTPUT);
  digitalWrite(PIN_LED,LOW);
  digitalWrite(PIN_LEDR,LOW);
  digitalWrite(PIN_LEDB,LOW);
  digitalWrite(PIN_LEDG,LOW);
}

void loop() { // run over and over
  if (SoftSerial.available() > 0) {
    // read the incoming byte:
    SoftSerial.readBytesUntil(0xFA, s_buffer, 6);
    handleData();
  }
  if (Serial.available() > 0) {
    // read the incoming byte:
    Serial.readBytesUntil(0xFA, s_buffer, 6);
    handleData();
  }
  if(digitalRead(PIN_BTN) == LOW){
    while(digitalRead(PIN_BTN) == LOW);
    lighton=!lighton;
  }
  if(!lighton) {
    digitalWrite(PIN_LEDR,HIGH);
    digitalWrite(PIN_LEDB,HIGH);
    digitalWrite(PIN_LEDG,HIGH);
  } else {
    analogWrite(PIN_LEDR,(byte) (0xFF * (1.0 - brightness)));
    analogWrite(PIN_LEDB,(byte) (0xFF * (1.0 - tempature * brightness)));
    analogWrite(PIN_LEDG,(byte) (0xFF * (1.0 - brightness)));
  }
  checkVar();
  blink();
}

void handleData() {
  int i = 0;
  while(s_buffer[i] != 0x3a) {
    i++;
  }
  if(s_buffer[i+2] == 0x40) {
    sendState();
  }else if(s_buffer[i+2] == 0x41) {
    lighton = (s_buffer[i+3] == 0xFF);
  }else if(s_buffer[i+2] == 0x42) {
    brightness = ((double) s_buffer[i+3]) / 0xFF;
  }else if(s_buffer[i+2] == 0x43) {
    tempature = ((double) s_buffer[i+3]) / 0xFF;
  }
}

void sendState() {
  byte t[3] = {(byte) (lighton * 0xFF), (byte) (brightness * 0xFF), (byte) (tempature * 0xFF)};
  byte buf[6] = {0x3A, 0x00, 0x41, 0x00, 0xFF, 0xFA};
  for(int i=0;i<3;i++){
    buf[2] = 0x41+i;
    buf[3] = t[i];
    Serial.write(buf, 6);
    SoftSerial.write(buf, 6);
  }
}

void checkVar() {
  if (brightness > 0xFF) brightness = 0xFF;
  else if (brightness < 0x00) brightness = 0x00;
  if (tempature > 0xFF) tempature = 0xFF;
  else if (tempature < 0x00) tempature = 0x00;
}

void blink() {
  if(t>5000) { digitalWrite(PIN_LED, !digitalRead(PIN_LED));t=0; }
  t++;
}

