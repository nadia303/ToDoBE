import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import UpdateTodoDto from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  addBoard(@Body('name') boardName: string) {
    return this.boardsService.create(boardName);
  }

  @Get()
  getAllBoards() {
    return this.boardsService.findAll();
  }

  @Delete(':id')
  deleteBoardById(@Param('id') boardId: string) {
    return this.boardsService.deleteById(boardId);
  }

  @Put(':id')
  updateBoard(@Param('id') boardId: string, @Body() board: UpdateTodoDto) {
    return this.boardsService.updateById(boardId, board);
  }
}
