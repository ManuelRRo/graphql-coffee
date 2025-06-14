import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
@InputType({ description: 'Create a Coffee Input Object Type' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'A new coffee name' })
  name: string;
  @Field()
  brand: string;
  @Field(() => [String])
  flavors: string[];
  @Field(() => CoffeeType)
  type: CoffeeType;
}
