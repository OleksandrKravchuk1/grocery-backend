import { IsDate, IsOptional, IsString, Length } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  @Length(2, 50, { message: 'First name must be at least 2 and at most 50 characters long' })
  firstName: string;

  @IsString()
  @Length(2, 50, { message: 'Last name must be at least 2 and at most 50 characters long' })
  lastName: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Phone number must be at least 10 and at most 15 characters long' })
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDate()
  birthDay?: Date;
}