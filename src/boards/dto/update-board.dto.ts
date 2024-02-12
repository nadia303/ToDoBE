import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  todoIds?: string[];
}

export default UpdateBoardDto;
