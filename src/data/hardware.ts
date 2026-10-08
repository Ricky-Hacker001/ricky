/**
 * Hardware Lab components. "built" and "project" only reference builds that
 * appear in the existing portfolio, résumé or public repos.
 */

export type HardwareId = "esp32" | "rpi" | "nrf24" | "mega" | "rfid" | "sonar";

export type HardwareItem = {
  id: HardwareId;
  name: string;
  what: string;
  built: string;
  project: string;
  tech: string[];
  bus: string;
};

export const HARDWARE: HardwareItem[] = [
  {
    id: "esp32",
    name: "ESP32 / ESP8266",
    what: "Wi-Fi + Bluetooth LE microcontrollers.",
    built: "Wireless sensor nodes, captive-portal labs and IoT control endpoints.",
    project: "Experimental IoT & wireless-security labs",
    tech: ["Wi-Fi", "BLE", "MicroPython", "C++"],
    bus: "UART / SPI / I²C",
  },
  {
    id: "rpi",
    name: "Raspberry Pi 4",
    what: "Linux single-board computer.",
    built: "The Wi-Fi intrusion monitor, an OpenCV detection rig and the brain of the Chrisbo robot.",
    project: "Wi-Fi Monitoring Security Device · Chrisbo",
    tech: ["Linux", "Python", "Scapy", "OpenCV"],
    bus: "GPIO / CSI / USB",
  },
  {
    id: "nrf24",
    name: "NRF24L01",
    what: "2.4 GHz RF transceiver module.",
    built: "Low-power radio links and wireless telemetry between microcontrollers.",
    project: "Wireless telemetry experiments",
    tech: ["RF", "2.4 GHz", "SPI", "Telemetry"],
    bus: "SPI",
  },
  {
    id: "mega",
    name: "Arduino Mega",
    what: "ATmega2560 motor + sensor controller.",
    built: "Actuator and sensor control layer for robotics and automation builds.",
    project: "Chrisbo — Humanoid Robot",
    tech: ["C/C++", "Motors", "Serial", "Sensors"],
    bus: "SERIAL / PWM",
  },
  {
    id: "rfid",
    name: "RFID Module",
    what: "125 kHz / 13.56 MHz reader-writer.",
    built: "Access-control experiments and an RFID cloning research project.",
    project: "rfid_cloner",
    tech: ["RFID", "SPI", "C++", "Access Control"],
    bus: "SPI",
  },
  {
    id: "sonar",
    name: "Ultrasonic Sensor",
    what: "HC-SR04 style ranging sensor.",
    built: "Entry-point intrusion sensing and proximity alerting.",
    project: "Wi-Fi Monitoring Security Device",
    tech: ["Ultrasonic", "GPIO", "IoT", "Telemetry"],
    bus: "GPIO TRIG / ECHO",
  },
];
