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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/telemetry', (req, res) => {
  const data = req.body;
  console.log("Inbound Hardware Telemetry:", data);

  const WATER_THRESHOLD = parseInt(process.env.WATER_THRESHOLD) || 300;
  const TEMP_THRESHOLD = parseFloat(process.env.TEMP_THRESHOLD) || 45.0;

  let anomaly = null;
  if (data.water_level > WATER_THRESHOLD) {
    anomaly = { type: "PLUMBING_LEAK", severity: "HIGH", message: "Water leak detected in utility zone!" };
  } else if (data.temperature > TEMP_THRESHOLD) {
    anomaly = { type: "OVERHEATING_FAULT", severity: "CRITICAL", message: "High utility room temperature detected!" };
  }

  io.emit('sensor_update', { telemetry: data, anomaly: anomaly });

  res.status(200).json({ status: "SUCCESS", anomaly_flagged: !!anomaly });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`GRID Server running on port ${PORT}`));
