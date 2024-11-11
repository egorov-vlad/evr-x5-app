import http from "node:http";
import express from 'express';
import WebSocket from 'ws'
import { connect } from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import api from './routes'
import { MONGODB_URI, PORT } from './config';

const app = express();

const swaggerOption: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "AVATAR-X5 API",
      version: "1.0.0",
    },
    swagger: "2.0",
    basePath: "/api",
    produces: [
      "application/json",
    ],
    schemes: ["http", "https"],
    tags: [
      {
        name: "User",
        description: "User management"
      }
    ]
  },
  apis: ["./src/routes/api/*.ts"],
}

const OpenApiSpecification = swaggerJSDoc(swaggerOption);

app.use(helmet(
  {
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "example.com"],
      },
    },
  })
)

app.use(cors({
  origin: '*',
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(OpenApiSpecification));
app.use('/api', api);

app.use(errors());
const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
  ws.on('message', m => {
    webSocketServer.clients.forEach(client => client.send(m));
  });


  ws.send('Hi there, I am a WebSocket server');
});

connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

server.listen(PORT, () => console.log("Server started"))