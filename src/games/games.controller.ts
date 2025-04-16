import { Controller, Get, Query } from '@nestjs/common'
import { Game } from './dto/create-game'
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
} from '@nestjs/swagger';
import { GamesService } from './games.service'

@ApiTags('Games')
@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Get('search')
	@ApiOperation({ summary: 'Buscar jogo por título (com cache e persistência)' })
	@ApiQuery({ name: 'title', required: true, type: String, description: 'Título do jogo a ser buscado' })
	@ApiResponse({ status: 200, type: Game, description: 'Lista de jogos retornada com sucesso.' })
	@ApiResponse({ status: 404, description: 'Jogo não encontrado na API externa.' })
	search(@Query('title') title: string) {
		return this.gamesService.searchGame(title)
	}

	@Get()
	@ApiOperation({ summary: 'Listar todos os jogos armazenados com filtros e paginação' })
	@ApiQuery({ name: 'name', required: false, type: String, description: 'Filtrar por título' })
	@ApiQuery({ name: 'platform', required: false, type: String, description: 'Filtrar por plataforma' })
	@ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página (paginação)' })
	@ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade de itens por página (paginação)' })
	@ApiResponse({ status: 200, type: Game, description: 'Lista de jogos retornada com sucesso.' })
	list(
		@Query('name') name?: string,
		@Query('platform') platform?: string,
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		return this.gamesService.listGames(name, platform, Number(page) || 1, Number(limit) || 10)
	}
}
