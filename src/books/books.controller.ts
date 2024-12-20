import { BookDto } from './dtos/book.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import {
  RegisterBookDto,
  RegisterBookDtoApiBodyOptions,
} from './dtos/register-book.dto';
import {
  UpdateBookDto,
  UpdateBookDtoApiBodyOptions,
} from './dtos/update-book.dto';

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
  @Get('/random')
  @ApiOperation({
    summary: '랜덤 도서 목록 조회',
    description: '임의의 수의 랜덤 도서 목록을 조회합니다.',
  })
  @ApiQuery({
    name: 'n',
    type: Number,
    description: '조회하려는 도서의 수',
    required: true,
  })
  @ApiOkResponse({
    type: BookDto,
    isArray: true,
  })
  async getRandomBooks(@Query('n') n: number) {
    return await this.booksService.getRandomBooks(n);
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
  @ApiOkResponse({
    type: BookDto,
    isArray: true,
  })
  async searchBooks(@Query('q') q?: string) {
    return await this.booksService.searchBooks(q);
  }

  @Get(':id')
  @ApiOperation({
    summary: '도서 조회',
    description: '특정 도서를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '조회하려는 도서의 ID',
  })
  @ApiOkResponse({
    type: BookDto,
    description: '도서 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '조회하려는 도서가 존재하지 않습니다.',
  })
  async getBook(@Param('id') id: number) {
    return await this.booksService.getBook(id);
  }

  // TODO: 페이지네이션을 적용해야 한다.
  @Get()
  @ApiOperation({
    summary: '전체 도서 목록 조회',
    description: '모든 도서 목록을 조회합니다.',
  })
  @ApiOkResponse({
    type: BookDto,
    isArray: true,
  })
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @Patch(':id')
  @ApiOperation({
    summary: '도서 정보 수정',
    description: '특정 도서 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '수정하려는 도서의 ID',
  })
  @ApiBody(UpdateBookDtoApiBodyOptions)
  @ApiOkResponse({
    type: BookDto,
    description: '도서 정보 수정 성공',
  })
  @ApiNotFoundResponse({
    description: '수정하려는 도서가 존재하지 않습니다.',
  })
  async updateBook(@Param('id') id: number, @Body() body: UpdateBookDto) {
    return await this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '도서 삭제',
    description: '특정 도서를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '삭제하려는 도서의 ID',
  })
  @ApiOkResponse({
    type: BookDto,
    description: '도서 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '삭제하려는 도서가 존재하지 않습니다.',
  })
  async deleteBook(@Param('id') id: number) {
    return await this.booksService.deleteBook(id);
  }
}
