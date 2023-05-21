import { IsOptional, IsBoolean, IsNotEmpty, IsEnum } from 'class-validator';
import { ServiceNames } from '../shared.enums';
import { Transform } from 'class-transformer';

export class RegistryOptionDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value !== 'false')
  url: boolean = false;

  @IsNotEmpty()
  @IsEnum(ServiceNames)
  name: ServiceNames;
}
