import { Injectable } from '@nestjs/common';
import { createClient } from "redis";
@Injectable()
export class RedisCacheService {
  private client: Record<string, any>
  constructor() {
    this.client= createClient({
      url: "redis://:silverlistic97!@203.232.193.178:9779",
    })
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect();
  }

  async get(key:string):Promise<string> {
    return await this.client.get(key);
  }

  async set(key:string, value:string): Promise<void> {
    await this.client.set(key, value);
  }
}