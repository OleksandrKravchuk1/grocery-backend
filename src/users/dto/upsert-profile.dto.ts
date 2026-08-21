import { IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UpsertProfileDto {
  @IsString()
  @Length(2, 50, { message: 'First name must be at least 2 and at most 50 characters long' })
  firstName: string;

  @IsString()
  @Length(2, 50, { message: 'Last name must be at least 2 and at most 50 characters long' })
  lastName: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Phone number must be at least 10 and at most 15 characters long' })
  phone: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}