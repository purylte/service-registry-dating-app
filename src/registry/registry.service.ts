import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registry } from './Registry.entity';
import { Repository } from 'typeorm';
import { ServiceNames } from './shared.enums';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(Registry)
    private registryRepository: Repository<Registry>,
  ) {}

  getValidServiceNames(): string[] {
    return Object.values(ServiceNames) as string[];
  }

  async getRegistryById(id: number): Promise<Registry> {
    return this.registryRepository.findOneBy({ id });
  }

  async getAllRegistrys(): Promise<Registry[]> {
    return this.registryRepository.find({
      order: { id: 'ASC', name: 'ASC', lastUpdated: 'DESC' },
    });
  }

  async getAllRegistrysByName(name: ServiceNames): Promise<Registry[]> {
    return this.registryRepository.find({
      where: { name },
      order: { lastUpdated: 'DESC' },
    });
  }

  async getLatestRegistryByName(name: ServiceNames): Promise<Registry> {
    return await this.registryRepository.findOne({
      where: { name },
      order: { lastUpdated: 'DESC' },
    });
  }

  async createRegistry(name: ServiceNames, url: string): Promise<Registry> {
    const Registry = this.registryRepository.create({ name, url });
    return this.registryRepository.save(Registry);
  }

  async updateRegistry(
    id: number,
    name: ServiceNames,
    url: string,
  ): Promise<Registry> {
    if ((await this.registryRepository.findOneBy({ id })) === null) {
      throw new NotFoundException(`Registry with id ${id} does not exist`);
    }
    await this.registryRepository.update(id, { name, url });
    return await this.registryRepository.findOneBy({ id });
  }

  async deleteRegistry(id: number) {
    if ((await this.registryRepository.findOneBy({ id })) === null) {
      throw new NotFoundException(`Registry with id ${id} does not exist`);
    }
    await this.registryRepository.delete(id);
  }
}
