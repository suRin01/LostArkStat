import { Injectable } from '@nestjs/common';
import { createClient } from "redis";
import "dotenv/config";

@Injectable()
export class RedisCacheService {
  private client: Record<string, any>
  private redisUrl = process.env.REDIS;
  constructor() {
    this.client= createClient({
      url: this.redisUrl
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect();
    console.debug(process.env.REDIS)
  }

  async get(key:string):Promise<string> {
    return await this.client.get(key);
  }

  async set(key:string, value:string): Promise<void> {
    await this.client.set(key, value);
  }
}