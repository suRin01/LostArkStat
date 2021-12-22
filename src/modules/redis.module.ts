import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from "../service/cache.service";
import "dotenv/config";

@Module({
	imports: [
	  CacheModule.registerAsync({
		imports: [ConfigModule.forRoot({
			envFilePath: ".env"
		})],
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => ({
		  store: redisStore,
		  host: configService.get('REDIS_HOST'),
		  port: configService.get('REDIS_PORT'),
		}),
	  }),
	],
	providers: [RedisCacheService],
	exports: [RedisCacheService] // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
  })
  export class RedisCacheModule {}