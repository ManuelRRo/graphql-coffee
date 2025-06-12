import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
@ObjectType({ description: 'Coffee Model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees /* inverse side */, {
    cascade: true,
  })
  @Field(() => [Flavor], { nullable: true })
  flavors?: Flavor[];

  @Field()
  @CreateDateColumn()
  createdAt?: Date;
}
