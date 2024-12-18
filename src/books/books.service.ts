import { excludePrismaScalarFields } from '@/_common/utils/exclude-prisma-scalar-fields';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto } from './dtos/book.dto';
import { RegisterBookDto } from './dtos/register-book.dto';
import { removeWhitespace } from '@/_common/utils/helpers';
import { UpdateBookDto } from './dtos/update-book.dto';

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

  async getBook(id: number) {
    const book = (await this.prismaService.book.findUnique({
      select: excludePrismaScalarFields('Book', ['searchIndex']),
      where: { id },
    })) as BookDto;

    if (!book) {
      throw new NotFoundException(
        `조회하려는 도서(ID: ${id})가 존재하지 않습니다.`,
      );
    }

    return book;
  }

  async getAllBooks() {
    return (await this.prismaService.book.findMany({
      select: excludePrismaScalarFields('Book', ['searchIndex']),
    })) as BookDto[];
  }

  async getRandomBooks(n: number) {
    console.log('getRandomBooks()');
    const query = `SELECT id, title, "subTitle", description, author, publisher, "coverImageUrl" 
    FROM "Book" ORDER BY RANDOM() LIMIT ${n}`;

    return (await this.prismaService.$queryRawUnsafe(query)) as BookDto[];
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

  async updateBook(id: number, dto: UpdateBookDto) {
    const book = await this.getBook(id);

    const searchIndex = removeWhitespace([
      dto.title ?? book.title,
      dto.subTitle ?? book.author,
      dto.author ?? book.author,
    ]);

    return (await this.prismaService.book.update({
      select: excludePrismaScalarFields('Book', ['searchIndex']),
      where: { id },
      data: { ...dto, searchIndex },
    })) as BookDto;
  }

  async deleteBook(id: number) {
    await this.getBook(id);

    return (await this.prismaService.book.delete({
      where: { id },
    })) as BookDto;
  }
}
