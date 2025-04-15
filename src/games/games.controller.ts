import { Controller, Get, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('search')
  search(@Query('title') title: string) {
    return this.gamesService.searchGame(title)
  }

  @Get()
  list(@Query('name') name?: string, @Query('platform') platform?: string) {
    return this.gamesService.listGames(name, platform)
  }
}
