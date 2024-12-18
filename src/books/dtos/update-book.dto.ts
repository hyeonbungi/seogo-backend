import { PartialType } from '@nestjs/mapped-types';
import { RegisterBookDto } from './register-book.dto';
import { ApiBodyOptions } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(RegisterBookDto) {}

export const UpdateBookDtoApiBodyOptions: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: '제목',
        nullable: true,
      },
      subTitle: {
        type: 'string',
        description: '부제목',
        nullable: true,
      },
      description: {
        type: 'string',
        description: '설명명',
        nullable: true,
      },
      author: {
        type: 'string',
        description: '저자자',
        nullable: true,
      },
      publisher: {
        type: 'string',
        description: '출판사',
        nullable: true,
      },
      coverImageUrl: {
        type: 'string',
        description: '표지 이미지 URL',
        nullable: true,
      },
    },
  },
};
