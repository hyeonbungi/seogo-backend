import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

ApiTags('리뷰(Reviews)');
@Controller('reviews')
export class ReviewsController {
  constructor() {}
}
