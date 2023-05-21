import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
} from '@nestjs/common';
import { RegistryService } from './registry.service';
import { Registry } from './registry.entity';
import { RegistryValueDto } from './dto/dto.registry.value';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RegistryIdDto } from './dto/dto.registry.id';
import { RegistryOptionDto } from './dto/dto.registry.option';

@Controller('services')
export class registryController {
  constructor(private registryService: RegistryService) {}

  @Get()
  getAllRegistrys(): Promise<Registry[]> {
    return this.registryService.getAllRegistrys();
  }

  @Get('/valid-names')
  getValidServiceNames(): string[] {
    return this.registryService.getValidServiceNames();
  }

  @Get('/latest')
  async getLatestRegistrys(
    @Query() query: RegistryOptionDto,
  ): Promise<Registry | string> {
    const { url, name } = query;
    const latestRegistry = this.registryService.getLatestRegistryByName(name);
    if (!url) {
      return latestRegistry;
    }
    const { url: latestUrl } = await latestRegistry;
    return latestUrl;
  }

  @Get(':id')
  getRegistryById(@Param() param: RegistryIdDto): Promise<Registry> {
    const { id } = param;
    return this.registryService.getRegistryById(id);
  }

  @Post()
  createService(@Body() body: RegistryValueDto): Promise<Registry> {
    const { name, url } = body;
    return this.registryService.createRegistry(name, url);
  }

  @Put(':id')
  updateService(
    @Param() param: RegistryIdDto,
    @Body() body: RegistryValueDto,
  ): Promise<Registry> {
    const { id } = param;
    const { name, url } = body;
    return this.registryService.updateRegistry(id, name, url);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteService(@Param() param: RegistryIdDto) {
    const { id } = param;
    return this.registryService.deleteRegistry(id);
  }
}
