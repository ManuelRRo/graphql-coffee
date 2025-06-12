import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return [];
  }
}
