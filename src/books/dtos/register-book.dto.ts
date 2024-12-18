import { IsCustomUrl, IsNonEmptyString } from '@/_common/validators';
import { ApiBodyOptions } from '@nestjs/swagger';

export class RegisterBookDto {
  @IsNonEmptyString()
  title: string;

  @IsNonEmptyString()
  subTitle: string;

  @IsNonEmptyString()
  description: string;

  @IsNonEmptyString()
  author: string;

  @IsNonEmptyString()
  publisher: string;

  @IsCustomUrl()
  coverImageUrl: string;
}

export const RegisterBookDtoApiBodyOptions: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: '제목',
      },
      subTitle: {
        type: 'string',
        description: '부제목',
      },
      description: {
        type: 'string',
        description: '설명명',
      },
      author: {
        type: 'string',
        description: '저자자',
      },
      publisher: {
        type: 'string',
        description: '출판사',
      },
      coverImageUrl: {
        type: 'string',
        description: '표지 이미지 URL',
      },
    },
  },
};
