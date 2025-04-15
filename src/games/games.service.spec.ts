import { Test, TestingModule } from '@nestjs/testing'
import { GamesService } from './games.service'
import { PrismaService } from '../prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

describe('GamesService', () => {
    let service: GamesService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [GamesService, PrismaService,
            {
                provide: CACHE_MANAGER,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                } as unknown as Cache,
            },
        ],
        }).compile()

        service = module.get<GamesService>(GamesService)
        prisma = module.get<PrismaService>(PrismaService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
