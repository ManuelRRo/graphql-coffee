import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Flavor } from '../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../entities/coffee.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'], // since we don't really need a coffee object here
      relations: ['flavors'], // to fetch related flavors
      where: {
        id: In(coffeeIds as number[]), // to make sure we only query requested coffees
      },
    });

    // to map an array of coffees two a 2-dimensional array of flavors where position in the array indicates to which coffee flavors belong
    return coffeesWithFlavors.map((coffee) => coffee.flavors || []);
  }
}
