import express, { Application } from "express";
import morgan from "morgan";
import config from "./lib/config/config";
import cors from "cors";
// Routes
import IndexRoutes from "./lib/music/routes/indexRoute";
import UserRoutes from "./lib/user/routes/userRoute";
import routesProtected from "./lib/config/protected";
import { options } from "../swagger/swaggerOptions";
import swaggerOptions from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerDocument  from "../swagger/swagger.json";
export class App {
  app: Application;

  constructor() 
  {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  
  private port= process.env.PORT || 5000
  
  private settings() {
    this.app.set("port", this.port);
    this.app.set("access-token", config.TOKEN_SECRET);
    this.app.set("dev", process.env.NODE_ENV || "development");
    this.app.set("prod", process.env.NODE_ENV || "production");
  }

  private middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    const specs = swaggerOptions(options);
    this.app.use(IndexRoutes);
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, specs));
    this.app.use("/", UserRoutes, routesProtected);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.port);
    console.log("Server on port", this.port);
  }
}
