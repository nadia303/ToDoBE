import { Injectable, NotFoundException } from '@nestjs/common';
import UpdateBoardDto from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/todos/schema/todos.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './schema/boards.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
  ) {}

  async create(board: CreateBoardDto) {
    try {
      const newBoard = new this.boardModel(board);
      return await newBoard.save();
    } catch (error) {
      throw new NotFoundException('Board creation failed');
    }
  }

  async findAll() {
    const data = await this.boardModel.find().populate('todos');

    const formattedBoards = data.map(({ _id, name, todos }) => ({
      id: _id,
      name,
      todos,
    }));

    return formattedBoards;
  }

  async findOne(boardId: string) {
    const board = await this.boardModel.findById(boardId).populate('todos');
    if (!board) {
      return [];
    }

    const formattedBoard = {
      id: board._id,
      name: board.name,
      todos: board.todos,
    };

    return [formattedBoard];
  }

  async deleteById(id: string) {
    await this.todoModel.deleteMany({ boardId: id });

    const result = await this.boardModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Board not found');
    }

    return result;
  }

  async updateById(id: string, board: UpdateBoardDto) {
    const updateData: any = {};

    if (board.name !== undefined) {
      updateData.name = board.name;
    }

    if (board.todoIds !== undefined) {
      const todoIds = board.todoIds;
      updateData.todos = todoIds;
    }

    const result = await this.boardModel.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
      },
    );

    if (!result) {
      throw new NotFoundException('Board not found');
    }

    return result;
  }
}
