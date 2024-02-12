import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import UpdateTodoDto from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import mongoose from 'mongoose';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Delete(':boardId/:todoId')
  async deleteTodoById(
    @Param('boardId') boardId: string,
    @Param('todoId') todoId: string,
  ) {
    console.log('DELETE');
    console.log({ boardId });
    console.log({ todoId });
    const isValidBoardId = mongoose.Types.ObjectId.isValid(boardId);
    const isValidTodoId = mongoose.Types.ObjectId.isValid(todoId);

    if (!isValidBoardId || !isValidTodoId) {
      throw new HttpException('Invalid ID', 400);
    }
    const deletedTodo = await this.todoService.deleteById({ boardId, todoId });
    if (!deletedTodo) {
      throw new HttpException('Todo not found', 400);
    }
    return deletedTodo;
  }

  @Patch(':id')
  async patchTodo(@Param('id') todoId: string, @Body() todo: UpdateTodoDto) {
    const isValid = mongoose.Types.ObjectId.isValid(todoId);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const updatedTodo = await this.todoService.patchById(todoId, todo);
    if (!updatedTodo) {
      throw new HttpException('Todo not found', 400);
    }
    return updatedTodo;
  }
}
