import { TodoStatus } from './types/status';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './interfaces/todo.interface';
import UpdateTodoDto from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel('ToDo') private todoModel: Model<ITodo>) {}

  async create(
    boardId: string,
    todoTitle: string,
    todoDescription: string,
    todoStatus: TodoStatus,
  ) {
    if (!boardId || !todoTitle || !todoDescription) {
      throw new BadRequestException(
        'Invalid input data. All fields are required.',
      );
    }

    const newTodo = new this.todoModel({
      boardId: boardId,
      title: todoTitle,
      description: todoDescription,
      status: todoStatus,
    });

    try {
      const result = await newTodo.save();
      const { _id, title, description } = result;
      return { id: _id, title, description };
    } catch (error) {
      throw new BadRequestException(
        'Error creating todo. Check your input data.',
      );
    }
  }

  async findAllByBoardId(boardId: string, status: TodoStatus) {
    const todos = await this.todoModel
      .find({ boardId, status })
      .sort({ _id: 1 });
    const formattedTodos = todos.map(({ _id, title, description }) => ({
      id: _id,
      title,
      description,
    }));
    return formattedTodos;
  }

  // async findAllByStatus(boardId: string, status: string) {
  //   const todos = await this.todoModel
  //     .find({ boardId, status })
  //     .sort({ _id: 1 });
  //   const formattedTodos = todos.map(({ _id, title, description }) => ({
  //     id: _id,
  //     title,
  //     description,
  //   }));
  //   return formattedTodos;
  // }

  async findOne(id: string) {
    const result = await this.todoModel.findById(id);
    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return result;
  }

  async deleteById(id: string) {
    const result = await this.todoModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Todo not found');
    }
    return result;
  }

  async updateById(id: string, todoData: UpdateTodoDto) {
    const result = await this.todoModel.findOneAndUpdate(
      { _id: id },
      todoData,
      {
        new: true,
      },
    );
    console.log('UPDATE');
    console.log({ result });
    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return result;
  }

  async deleteByBoardId(boardId: string) {
    const result = await this.todoModel.deleteMany({ boardId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('No todos found for the given boardId.');
    }

    return result;
  }
}
