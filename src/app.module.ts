import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    isGlobal: true
  }),GamesModule],
})
export class AppModule {}

