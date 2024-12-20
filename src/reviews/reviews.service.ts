import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterReviewDto } from './dtos/register-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewDto } from './dtos/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerReview(dto: RegisterReviewDto) {
    return (await this.prismaService.review.create({
      data: { ...dto, bookId: dto.bookId },
    })) as ReviewDto;
  }

  async getReview(id: number) {
    const review = (await this.prismaService.review.findUnique({
      where: { id },
    })) as ReviewDto;

    if (!review) {
      throw new NotFoundException(
        `조회하려는 리뷰(ID: ${id})가 존재하지 않습니다.`,
      );
    }

    return review;
  }

  async getAllReviews() {
    return (await this.prismaService.review.findMany({
      orderBy: { createdAt: 'desc' },
    })) as ReviewDto[];
  }

  async getAllReviewsForBook(bookId: number) {
    return (await this.prismaService.review.findMany({
      where: { bookId },
      orderBy: { createdAt: 'desc' },
    })) as ReviewDto[];
  }

  async updateReview(id: number, dto: UpdateReviewDto) {
    await this.getReview(id);

    return (await this.prismaService.review.update({
      where: { id },
      data: dto,
    })) as ReviewDto;
  }

  async deleteReview(id: number) {
    await this.getReview(id);

    return (await this.prismaService.review.delete({
      where: { id },
    })) as ReviewDto;
  }
}
