import { IsNonEmptyString } from '@/_common/validators';
import { ApiBodyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class RegisterReviewDto {
  @IsNonEmptyString()
  content: string;

  @IsNonEmptyString()
  reviewer: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  bookId: number;
}

export const RegisterReviewDtoApiBodyOptions: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: '내용',
      },
      reviewer: {
        type: 'string',
        description: '리뷰어',
      },
      bookId: {
        type: 'integer',
        description: '연관 도서 ID',
      },
    },
  },
};
