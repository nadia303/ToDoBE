import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import UpdateTodoDto from './dto/update-todo.dto';
import { TodoStatus } from './types/status';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  addTodo(
    @Body('title') todoTitle: string,
    @Body('boardId') boardId: string,
    @Body('description') todoDescription: string,
    @Body('status') todoStatus: TodoStatus,
  ) {
    return this.todoService.create(
      boardId,
      todoTitle,
      todoDescription,
      todoStatus,
    );
  }

  @Get('/byBoard/:id')
  getAllTodosByBoardId(
    @Param('id') boardId: string,
    @Query('status') status: TodoStatus,
  ) {
    return this.todoService.findAllByBoardId(boardId, status);
  }

  @Delete(':id')
  deleteTodoById(@Param('id') todoId: string) {
    return this.todoService.deleteById(todoId);
  }

  @Put(':id')
  updateTodo(@Param('id') todoId: string, @Body() todo: UpdateTodoDto) {
    return this.todoService.updateById(todoId, todo);
  }
}
