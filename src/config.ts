import { registerAs } from "@nestjs/config";

export default registerAs('config', ()=> {
  return{
    mongo:{
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      connection: process.env.MONGO_CONNECTION
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires : process.env.JWT_EXPIRES
  };
});
