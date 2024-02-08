import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
// import { Exclude } from 'class-transformer';

export class UpdateBoardDto {
  @IsOptional()
  //   @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default UpdateBoardDto;
