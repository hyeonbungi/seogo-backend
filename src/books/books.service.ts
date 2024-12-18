import { excludePrismaScalarFields } from '@/_common/utils/exclude-prisma-scalar-fields';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BookDto } from './dtos/book.dto';
import { RegisterBookDto } from './dtos/register-book.dto';
import { removeWhitespace } from '@/_common/utils/helpers';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerBook(dto: RegisterBookDto) {
    const searchIndex = removeWhitespace([dto.title, dto.subTitle, dto.author]);

    return (await this.prismaService.book.create({
      data: { ...dto, searchIndex },
      select: excludePrismaScalarFields('Book', ['searchIndex']),
    })) as BookDto;
  }

  async getAllBooks() {
    return (await this.prismaService.book.findMany({
      select: excludePrismaScalarFields('Book', ['searchIndex']),
    })) as BookDto[];
  }

  async searchBooks(q?: string) {
    const searchText = q.replace(/\s+/g, '');

    return (await this.prismaService.book.findMany({
      select: excludePrismaScalarFields('Book', ['searchIndex']),
      where: {
        OR: [
          {
            searchIndex: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
        ],
      },
    })) as BookDto[];
  }

  async updateBook() {}

  async deleteBook() {}
}
