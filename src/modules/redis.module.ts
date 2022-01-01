import { Module, CacheModule } from '@nestjs/common';
import { RedisCacheService } from "../service/cache.service";
import "dotenv/config";

@Module({
	imports: [ ],
	providers: [RedisCacheService],
	exports: [RedisCacheService] // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
  })
  export class RedisCacheModule {}