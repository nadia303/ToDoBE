import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsString({ message: 'boardId must be a string' })
  @IsNotEmpty({ message: 'boardId cannot be empty' })
  boardId: string;
}
