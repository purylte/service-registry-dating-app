import { IsNotEmpty, IsEnum, IsUrl } from 'class-validator';
import { ServiceNames } from '../shared.enums';

export class RegistryValueDto {
  @IsNotEmpty()
  @IsEnum(ServiceNames)
  name: ServiceNames;

  @IsUrl()
  url: string;
}
