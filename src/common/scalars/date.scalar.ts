import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description: 'Date custom scalar';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`Serialising: ${value}`);
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return new Date(); //check this because i put it
  }
}
