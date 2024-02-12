import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;
}

export default UpdateTodoDto;
