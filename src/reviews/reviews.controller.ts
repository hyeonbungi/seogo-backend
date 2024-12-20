import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import {
  RegisterReviewDto,
  RegisterReviewDtoApiBodyOptions,
} from './dtos/register-review.dto';
import { ReviewDto } from './dtos/review.dto';
import {
  UpdateReviewDto,
  UpdateReviewDtoApiBodyOptions,
} from './dtos/update-review.dto';

ApiTags('리뷰(Reviews)');
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({
    summary: '리뷰 등록',
    description: '신규 리뷰를 등록합니다.',
  })
  @ApiBody(RegisterReviewDtoApiBodyOptions)
  @ApiCreatedResponse({
    type: ReviewDto,
    description: '리뷰 등록 성공',
  })
  async registerReview(@Body() body: RegisterReviewDto) {
    return await this.reviewsService.registerReview(body);
  }

  // TODO: 페이지네이션을 적용해야 한다.
  @Get('/book/:bookId')
  @ApiOperation({
    summary: '도서별 리뷰 목록 조회',
    description: '특정 도서에 대한 리뷰 목록을 조회합니다.',
  })
  @ApiParam({
    name: 'bookId',
    type: Number,
    description: '조회하려는 리뷰가 속한 도서 ID',
  })
  @ApiOkResponse({
    type: ReviewDto,
    isArray: true,
    description: '리뷰 목록 조회 성공',
  })
  async getAllReviewsForBook(@Param('bookId') bookId: number) {
    return await this.reviewsService.getAllReviewsForBook(bookId);
  }

  // TODO: 페이지네이션을 적용해야 한다.
  @Get('')
  @ApiOperation({
    summary: '전체 리뷰 목록 조회',
    description: '전체 리뷰 목록을 조회합니다.',
  })
  @ApiOkResponse({
    type: ReviewDto,
    isArray: true,
    description: '리뷰 목록 조회 성공',
  })
  async getAllReviews() {
    return await this.reviewsService.getAllReviews();
  }

  @Get(':id')
  @ApiOperation({
    summary: '리뷰 조회',
    description: '특정 리뷰를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '조회하려는 리뷰의 ID',
  })
  @ApiOkResponse({
    type: ReviewDto,
    description: '리뷰 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '조회하려는 리뷰가 존재하지 않습니다.',
  })
  async getReview(@Param('id') id: number) {
    return await this.reviewsService.getReview(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '리뷰 수정',
    description: '특정 리뷰를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '수정하려는 리뷰의 ID',
  })
  @ApiBody(UpdateReviewDtoApiBodyOptions)
  @ApiOkResponse({
    type: ReviewDto,
    description: '리뷰 수정 성공',
  })
  @ApiNotFoundResponse({
    description: '수정하려는 리뷰가 존재하지 않습니다.',
  })
  async updateReview(@Param('id') id: number, @Body() body: UpdateReviewDto) {
    return await this.reviewsService.updateReview(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '리뷰 삭제',
    description: '특정 리뷰를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '삭제하려는 리뷰의 ID',
  })
  @ApiOkResponse({
    type: ReviewDto,
    description: '리뷰 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '삭제하려는 리뷰가 존재하지 않습니다.',
  })
  async deleteReview(@Param('id') id: number) {
    return await this.reviewsService.deleteReview(id);
  }
}
