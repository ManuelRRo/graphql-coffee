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
import { Drink } from 'src/common/interfaces/drinkg.interface';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Coffee Model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ middleware: [loggerMiddleware] })
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

  @Field(() => CoffeeType, { nullable: true })
  @Column({ nullable: true })
  type?: CoffeeType;
}
