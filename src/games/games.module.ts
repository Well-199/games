import { Module } from '@nestjs/common'
import { GamesController } from './games.controller'
import { GamesService } from './games.service'
import { PrismaService } from '../prisma.service'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [CacheModule.register()],
  controllers: [GamesController],
  providers: [GamesService, PrismaService],
})
export class GamesModule {}
