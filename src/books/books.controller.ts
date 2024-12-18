import { BookDto } from './dtos/book.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import {
  RegisterBookDto,
  RegisterBookDtoApiBodyOptions,
} from './dtos/register-book.dto';

@ApiTags('도서(Books)')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: '도서 등록',
    description: '신규 도서를 등록합니다.',
  })
  @ApiBody(RegisterBookDtoApiBodyOptions)
  @ApiCreatedResponse({
    type: BookDto,
    description: '도서 등록 성공',
  })
  async createBook(@Body() body: RegisterBookDto) {
    return await this.booksService.registerBook(body);
  }

  // TODO: 페이지네이션을 적용해야 한다.
  @Get()
  @ApiOperation({
    summary: '전체 도서 목록 조회',
    description: '모든 도서 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: BookDto,
    isArray: true,
  })
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  // TODO: 페이지네이션을 적용해야 한다.
  @Get('/search')
  @ApiOperation({
    summary: '도서 검색',
    description:
      '제목 또는 저자, 출판사 정보를 기반으로 특정 도서 목록을 검색합니다.',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    description: '검색어(제목, 저자, 출판사)',
    required: true,
  })
  @ApiResponse({
    type: BookDto,
    isArray: true,
  })
  async searchBooks(@Query('q') q?: string) {
    return await this.booksService.searchBooks(q);
  }
}
