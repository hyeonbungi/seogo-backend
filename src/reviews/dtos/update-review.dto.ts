import { IsNonEmptyString } from '@/_common/validators';
import { ApiBodyOptions } from '@nestjs/swagger';

export class UpdateReviewDto {
  @IsNonEmptyString()
  content: string;
}

export const UpdateReviewDtoApiBodyOptions: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: '내용',
      },
    },
  },
};
