import { Module, Global} from '@nestjs/common';
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigType } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import { MongoClient } from 'mongodb';
import { MongooseModule } from "@nestjs/mongoose";

import config from "../config";

@Global()
@Module({
  imports:[
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory:(configService:ConfigType<typeof config>)=>{
        const {connection, user, password, /* host, port, */ dbName} = configService.mongo;
        return {
          /* uri:`${connection}://${host}:${port}`, */
          uri: `${connection}://${user}:${password}@cluster0.c5lzx.mongodb.net/?retryWrites=true&w=majority`,
          user,
          pass: password,
          dbName
        }
      },
      inject: [config.KEY]
    })
  ],

  providers:[
    {
      provide: 'dolar',
      useFactory:async(http:HttpService)=>{
        const datos = await firstValueFrom(http.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales'))
        return datos.data[1].casa
      },
      inject:[HttpService]
    },
    {
      provide: 'MONGO',
      useFactory: async(configService:ConfigType<typeof config>)=>{

        const {connection, user, password, /* host, port, */ dbName,} = configService.mongo;

        const uri = `${connection}://${user}:${password}@cluster0.c5lzx.mongodb.net/?retryWrites=true&w=majority`
        const client = new MongoClient(uri);
        await client.connect();
        const database  = client.db(dbName);
        return database
      },
      inject: [config.KEY]
    }
  ],

  exports:['dolar', 'MONGO', MongooseModule]
})

export class DatabaseModule {}


/*
mongodb://root:root@localhost:27017/%E2%80%9CauthSource=admin?authMechanism=DEFAULT&authSource=admin
`${connection}://${user}:${password}@${host}:${port}/%E2%80%9CauthSource=admin?authMechanism=DEFAULT&authSource=admin`
MONGO_INITDB_ROOT_USERNAME='root'
MONGO_INITDB_ROOT_PASSWORD='root'
MONGO_DB='App_Nest'
MONGO_PORT=27017
MONGO_HOST='localhost'
MONGO_CONNECTION='mongodb'

mongodb+srv://gcoria1989:gimeno666@cluster0.c5lzx.mongodb.net/test
*/
