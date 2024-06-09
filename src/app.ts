import express from 'express';
import routers from './web/routers';
import log4js from 'log4js';
import mongoose, { ConnectOptions } from 'mongoose';
import { log4jsconfig } from "./config/log4jsconfig";
import * as process from "process";
import { configDotenv } from "dotenv";
import  {Request, Response} from 'express'

configDotenv();

export default async () => {
  const app = express();

  log4js.configure(log4jsconfig);

  // to disable caching of requests returning 304 instead of 200
  app.disable('etag');

  app.use(express.json({ limit: '1mb' }));

  app.use((req,res,next)=>{
    res.status;
    log4js.getLogger().info(`Receiving ${req.method} request for ${req.url}`);
    next();
  });

  app.get('/', (req: Request,res: Response)=>{req.body;res.status(200).json('Hello!')});
  app.use('/api', routers);


  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    log4js.getLogger().info(`Example app listening on port ${port}`);
  });

  const mongoAddress = process.env.MONGODB_URL || "";
  await mongoose.connect(mongoAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
  } as ConnectOptions);
  console.log('db connected')

  return app;
};
