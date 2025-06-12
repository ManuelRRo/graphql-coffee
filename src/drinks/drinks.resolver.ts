import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/coffees/entities/tea.entity';
import { DrinksResultUnion } from 'src/common/unions/drink-result.union';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinksResultUnion)[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Spun';
    coffee.brand = 'Black COffe';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [tea, coffee];
  }
}
