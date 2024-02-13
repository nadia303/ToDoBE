import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import UpdateTodoDto from './dto/update-board.dto';
import mongoose from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  addBoard(@Body() board: CreateBoardDto) {
    return this.boardsService.create(board);
  }

  @Get()
  getAllBoards(@Query('id') boardId?: string) {
    if (boardId) {
      const isValid = mongoose.Types.ObjectId.isValid(boardId);
      if (!isValid) {
        return [];
      }
      return this.boardsService.findOne(boardId);
    } else {
      return this.boardsService.findAll();
    }
  }

  @Delete(':id')
  deleteBoardById(@Param('id') boardId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(boardId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    return this.boardsService.deleteById(boardId);
  }

  @Patch(':id')
  updateBoard(@Param('id') boardId: string, @Body() board: UpdateTodoDto) {
    const isValid = mongoose.Types.ObjectId.isValid(boardId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    return this.boardsService.updateById(boardId, board);
  }
}
