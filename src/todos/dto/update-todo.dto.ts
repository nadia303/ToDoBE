import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

export default UpdateTodoDto;
