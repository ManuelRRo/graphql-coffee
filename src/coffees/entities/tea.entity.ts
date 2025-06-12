import { Field, ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drinkg.interface';

@ObjectType({ implements: () => Drink })
export class Tea implements Drink {
  @Field()
  name: string;
}
