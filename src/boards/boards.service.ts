import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBoard } from './interfaces/board.interface';
import UpdateBoardDto from './dto/update-board.dto';
import { TodosService } from 'src/todos/todos.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private boardModel: Model<IBoard>,
    @Inject(TodosService) private readonly todosService: TodosService, // Inject the TodosService
  ) {}

  async create(boardName: string) {
    const newBoard = new this.boardModel({
      name: boardName,
    });
    const result = await newBoard.save();

    return result;
  }

  async findAll() {
    const data = await this.boardModel.find().sort({ _id: 1 });

    const formattedBoards = data.map(({ _id, name }) => ({
      id: _id,
      name,
    }));
    return formattedBoards;
  }

  async deleteById(id: string) {
    await this.todosService.deleteByBoardId(id);

    const result = await this.boardModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async updateById(id: string, board: UpdateBoardDto) {
    const result = await this.boardModel.findOneAndUpdate({ _id: id }, board, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException();
    }
    console.log('Update');
    console.log({ result });
    return result;
  }
}
