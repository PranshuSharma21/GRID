const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let latestTelemetry = {
  waterPressure: null,
  humidity: null,
  temp: null,
  voltage: 230,
  anomaly: null,
  lastSeen: null
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/telemetry/latest', (req, res) => {
  res.status(200).json(latestTelemetry);
});

app.post('/api/telemetry', (req, res) => {
  const data = req.body;
  console.log("Inbound Hardware Telemetry:", data);

  const WATER_THRESHOLD = parseInt(process.env.WATER_THRESHOLD) || 300;
  const TEMP_THRESHOLD = parseFloat(process.env.TEMP_THRESHOLD) || 45.0;

  const waterVal = data.waterPressure !== undefined ? data.waterPressure : (data.water !== undefined ? data.water : data.water_level);
  const humVal = data.humidity !== undefined ? data.humidity : data.hum;
  const tempVal = data.temperature !== undefined ? data.temperature : data.temp;

  let anomaly = null;
  if (waterVal !== undefined && waterVal > WATER_THRESHOLD) {
    anomaly = { type: "PLUMBING_LEAK", severity: "HIGH", message: "Water leak detected in utility zone!" };
  } else if (tempVal !== undefined && tempVal > TEMP_THRESHOLD) {
    anomaly = { type: "OVERHEATING_FAULT", severity: "CRITICAL", message: "High utility room temperature detected!" };
  }

  latestTelemetry = {
    waterPressure: waterVal !== undefined ? waterVal : latestTelemetry.waterPressure,
    humidity: humVal !== undefined ? humVal : latestTelemetry.humidity,
    temp: tempVal !== undefined ? tempVal : latestTelemetry.temp,
    water: waterVal !== undefined ? waterVal : latestTelemetry.waterPressure,
    hum: humVal !== undefined ? humVal : latestTelemetry.humidity,
    voltage: data.voltage || latestTelemetry.voltage,
    anomaly: anomaly,
    lastSeen: new Date().toISOString()
  };

  io.emit('telemetry_update', latestTelemetry);
  io.emit('sensor_update', { telemetry: data, anomaly: anomaly });

  res.status(200).json({ status: "SUCCESS", anomaly_flagged: !!anomaly });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`GRID Server running on port ${PORT}`));
