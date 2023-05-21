import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RegistryIdDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
