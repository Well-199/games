import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'
import { Cache } from 'cache-manager'
import axios from 'axios'

@Injectable()
export class GamesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private prisma: PrismaService) {}

  async searchGame(title: string) {
    const cached = await this.cacheManager.get(title.toLowerCase())
    if (cached) return cached

    const existing = await this.prisma.game.findFirst({ where: { title: { equals: title, mode: 'insensitive' } } })
    if (existing) {
        await this.cacheManager.set(title.toLowerCase(), existing)
        return existing
    }

    const { data } = await axios.get(`https://api.rawg.io/api/games?search=${title}&key=YOUR_RAWG_API_KEY`)
    const gameData = data.results?.[0]

    if (!gameData) throw new NotFoundException('Game not found')

    const game = await this.prisma.game.create({
        data: {
            title: gameData.name,
            description: gameData.slug,
            platforms: gameData.platforms.map((p) => p.platform.name).join(', '),
            releasedate: new Date(gameData.released),
            rating: gameData.rating,
            coverimage: gameData.background_image,
        },
    })

    await this.cacheManager.set(title.toLowerCase(), game)
    return game
  }

  async listGames(name?: string, platform?: string, page = 1, limit = 10) {
    
    // Com SQL puro usamos o offset e não realizamos esse calculo
    // Calcula quantos registros devem ser "pulados" com base na página e no limite
    // Exemplo: página 2 com limite 10 → pula os 10 primeiros registros ((2-1)*10 = 10)
    const skip = (page - 1) * limit
  
    // Definindo os filtros corretamente para o Prisma
    const where = {
      title: name ? { contains: name, mode: Prisma.QueryMode.insensitive } : undefined,
      platforms: platform ? { contains: platform, mode: Prisma.QueryMode.insensitive } : undefined,
    }
  
    // Consultando os jogos e a contagem total com Promise.all
    const [games, total] = await Promise.all([
      this.prisma.game.findMany({ where, skip, take: limit }),
      this.prisma.game.count({ where })// ja retorna a quantidade de itens
    ])
  
    return { total, page, limit, games }
  }
}
