import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewDto implements Review {
  @ApiProperty({ description: '리뷰 ID' })
  id: number;

  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @ApiProperty({ description: '내용' })
  content: string;

  @ApiProperty({ description: '리뷰어' })
  reviewer: string;

  @ApiProperty({ description: '연관 도서 ID' })
  bookId: number;
}
