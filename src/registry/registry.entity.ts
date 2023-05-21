import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceNames } from './shared.enums';

@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: ServiceNames;

  @Column()
  url: string;

  @UpdateDateColumn({ type: 'timestamp' })
  lastUpdated: Date;
}
