import { Field, InputType } from '@nestjs/graphql';
@InputType({ description: 'Create a Coffee Input Object Type' })
export class CreateCoffeeInput {
  @Field(() => String, { description: 'A new coffee name' })
  name: string;
  @Field()
  brand: string;
  @Field(() => [String])
  flavors: string[];
}
