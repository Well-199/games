import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../prisma.service'
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
        await this.cacheManager.set(title.toLowerCase(), existing);
        return existing;
    }

    const { data } = await axios.get(`https://api.rawg.io/api/games?search=${title}&key=YOUR_RAWG_API_KEY`)
    const gameData = data.results?.[0];

    if (!gameData) throw new NotFoundException('Game not found');

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

  async listGames(name?: string, platform?: string) {
    return this.prisma.game.findMany({
        where: {
            title: name ? { contains: name, mode: 'insensitive' } : undefined,
            platforms: platform ? { contains: platform, mode: 'insensitive' } : undefined,
        },
    })
  }
}
