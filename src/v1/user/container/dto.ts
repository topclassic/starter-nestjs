import { IsNumber, Min, Max, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @Min(10)
  readonly phone?: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  @Min(10)
  readonly phone?: number;
}

export class ParamDTO {
  @IsUUID()
  id: string;
}
