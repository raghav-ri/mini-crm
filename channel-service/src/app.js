import express from "express";
import cors from "cors";

import channelRoutes from "./routes/channel.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/channel", channelRoutes);

export default app;