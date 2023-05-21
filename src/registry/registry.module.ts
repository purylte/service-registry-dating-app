import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registry } from './registry.entity';
import { RegistryService } from './registry.service';
import { registryController } from './registry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registry])],
  providers: [RegistryService],
  controllers: [registryController],
})
export class RegistryModule {}
