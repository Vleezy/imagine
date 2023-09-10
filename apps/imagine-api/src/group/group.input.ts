import {Field, InputType} from '@nestjs/graphql';
import {Max} from 'class-validator';
import {GLOBAL_MAX_RESOURCE_LIMIT} from '../imagine.constant';

@InputType()
export class GroupFilterManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];

  @Field(() => [Number], {nullable: true})
  userIDs?: number[];

  @Field(() => Number, {nullable: true})
  @Max(GLOBAL_MAX_RESOURCE_LIMIT)
  limit?: number;
}

@InputType()
export class GroupFilterOneInput {
  @Field(() => Number)
  id!: number;
}