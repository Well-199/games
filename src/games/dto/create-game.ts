import { ApiProperty } from '@nestjs/swagger';

export class Game {
    @ApiProperty({ example: 'God of War' })
    title: string

    @ApiProperty({ example: 'Ação e aventura' })
    description: string

    @ApiProperty({ example: 'PlayStation 5, PC' })
    platforms: string

    @ApiProperty({ example: '2022-11-09T00:00:00Z' })
    releaseDate: Date

    @ApiProperty({ example: 4.5 })
    rating: number

    @ApiProperty({ example: 'https://image.url' })
    coverImage: string
}

