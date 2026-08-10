<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Segoe+UI&weight=800&size=50&duration=3000&pause=1000&color=C084FC&center=true&vCenter=true&width=800&height=100&lines=G.R.I.D;System;Intelligent+Infrastructure;Gateway+for+Repairs" alt="GRID Animated Header" />

**Gateway for Repairs Inventory and Dispatch**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Beta_Development-A855F7?style=for_the_badge" alt="Status" />
  <img src="https://img.shields.io/badge/Hardware-ESP8266_%7C_ESP32-38BDF8?style=for_the_badge" alt="Hardware" />
  <img src="https://img.shields.io/badge/Backend-Node.js_%7C_Express-34D399?style=for_the_badge" alt="Backend" />
  <img src="https://img.shields.io/badge/WebSockets-Socket.io-F43F5E?style=for_the_badge" alt="WebSockets" />
</p>

</div>

## ⚡ The Problem

Infrastructure failures in residential buildings, housing societies, and commercial complexes typically go unnoticed until catastrophic damage occurs. Undetected electrical anomalies cause fires, while unmonitored HVAC leaks and hidden water pipe bursts lead to severe structural damage. Existing solutions are either fragmented, overly expensive, or lack real time automated intervention.

## 🌐 Our Solution

Think of **GRID** as an intelligent digital security guard for your entire building. It is a unified, real time safeguard platform. By combining edge hardware processing with a persistent cloud server, GRID intercepts incoming failure signals in real time, instantly isolating power during short circuits and sending instant diagnostic telemetry to facility administrators before minor issues become costly disasters.

## 🏗️ Technical Architecture

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Edge Hardware** | `C++`, `ESP8266`, `ESP32` | Microcontrollers interfacing with many arm64 digital and analog sensors . |
| **Backend Cloud** | `Node.js`, `Express`, `Render` | Monolithic server handling REST API routes and receiving hardware JSON payloads. |
| **Real time Engine**| `Socket.io`, `WebSockets` | Low latency broadcasting engine pushing updates from the server to web clients instantly. |
| **Frontend UI** | `HTML5`, `CSS3`, `Chart.js` | Custom noise based shaders, animated Canvas elements, and auto polling charts. |

## ✨ Key Features

* **Real time Data Sync:** Sub second sensor payload synchronization from physical hardware straight to active browser dashboards via WebSockets.
* **Electrical Interception & Fire Prevention:** Active signal monitoring designed to step in during short circuits and mitigate volatile voltage spikes.
* **Environmental & Fluid Safeguards:** Automated oversight for HVAC air pressure, ambient humidity, and water leak detection via pressure threshold breaches.
* **Predictive AI Models (Upcoming):** Machine learning models evaluating multi sensor correlations to predict component failures before they occur.
* **Dynamic Diagnostic Logging:** Continuous streaming logs that record historical metric syncs and threshold breach alerts.

## ⚙️ How It Works

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" style="opacity: 0.3;">
</div>

1. **Data Sensing:** Microcontrollers deployed at critical infrastructure nodes (electrical mains, HVAC ducts, water risers) gather sensor measurements.
2. **Payload Dispatch:** Edge devices structure sensor metrics into JSON payloads and post them via HTTP REST endpoints (`/api/telemetry`).
3. **Cloud Processing:** The Express server receives incoming payloads, runs threshold checks, and broadcasts updates instantly using persistent WebSockets.
4. **Live Visualization:** Web clients connected to the GRID live dashboard render instant alerts and plot real time Chart.js graphs.

## 🛡️ Challenges & Solutions

**Challenge 1: Render Cloud Free Tier Latency**
Cold starts and connection drops on cloud instances interrupted real time WebSocket streams from hardware clients.
* **Solution:** Configured auto reconnect fallback logic on Socket.io, implemented an HTTP GET `/latest` fallback endpoint, and added auto polling every 3 seconds to recover lost client states gracefully.

**Challenge 2: Hardware Payload Reliability**
Handling intermittent Wi Fi drops on ESP8266 microcontrollers without freezing core sensor sampling routines.
* **Solution:** Structured C++ microcontroller routines using non blocking timer loops (`millis()`) instead of blocking `delay()` calls, ensuring continuous Wi Fi reconnect attempts without interrupting local hardware sampling.

**Challenge 3: Low Latency Rendering on Lightweight Clients**
Managing complex Canvas animations (Particle text systems and octaved noise electric borders) without bogging down web execution.
* **Solution:** Rewrote particle sampling loops to use offscreen canvases, clamped DPR scaling, and offloaded heavy noise algorithms to optimized `requestAnimationFrame` loops.

## 🚀 Future Improvements

* **ARM64 Native Edge Scaling:** Expanding native hardware support across full scale ARM64 single board computer clusters for enterprise facilities.
* **Automated Repair Dispatch Workflow:** Linking threshold alerts directly to third party vendor APIs for automated technician dispatch and replacement inventory ordering.
* **Hardware Actuator Control:** Implementing bi directional WebSocket relays to let admins remotely shut off main water valves or trip electrical breakers directly from the web dashboard.

## 👨‍💻 The Builders

| Pranshu Sharma | Archit Jha |
| :---: | :---: |
| <img src="https://ui-avatars.com/api/?name=Pranshu+Sharma&background=a855f7&color=fff&size=100" style="border-radius:50%;" /> | <img src="https://ui-avatars.com/api/?name=Archit+Jha&background=38bdf8&color=fff&size=100" style="border-radius:50%;" /> |
| **Main Dev / Architect**<br>Embedded Systems Engineer | **Main Designer**<br>Documentation Lead |
| [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-A855F7?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/pranshu-sharma-a52321334) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-38BDF8?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/archit-jha-147800297) |

<div align="center">
  <br>
  <i>Team Butter Kitchen</i>
</div>
