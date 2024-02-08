import { Exclude } from '@nestjs/class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export default UpdateTodoDto;
