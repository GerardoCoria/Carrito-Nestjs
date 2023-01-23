import { Module, Global} from '@nestjs/common';
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigType } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import { MongoClient } from 'mongodb';

import config from "../config";

@Global()
@Module({
  imports:[HttpModule],
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

        const {connection, user, password, host, port, dbName,} = configService.mongo;

        const uri = `${connection}://${user}:${password}@${host}:${port}/%E2%80%9CauthSource=admin?authMechanism=DEFAULT&authSource=admin`
        const client = new MongoClient(uri);
        await client.connect();
        const database  = client.db(dbName);
        return database
      },
      inject: [config.KEY]
    }
  ],
  exports:['dolar', 'MONGO']
})

export class DatabaseModule {}


/*
mongodb://root:root@localhost:27017/%E2%80%9CauthSource=admin?authMechanism=DEFAULT&authSource=admin
*/
