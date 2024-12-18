import { ApiProperty } from '@nestjs/swagger';
import { Book } from './../../../node_modules/.prisma/client/index.d';

export class BookDto implements Omit<Book, 'searchIndex'> {
  @ApiProperty({
    description: '도서 ID',
  })
  id: number;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '부제목' })
  subTitle: string;

  @ApiProperty({ description: '설명' })
  description: string;

  @ApiProperty({ description: '저자' })
  author: string;

  @ApiProperty({ description: '출판사' })
  publisher: string;

  @ApiProperty({ description: '표지 이미지 URL' })
  coverImageUrl: string;
}
