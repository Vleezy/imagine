import {omit} from 'lodash';
import {ArticleArgs} from './article.args';
import {ArticleModel} from './article.model';
import {UserModel} from '../user/user.model';
import {Inject, forwardRef} from '@nestjs/common';
import {UserEntity} from '../database/user.entity';
import {GetUser} from '../session/get-user.decorator';
import {HasScope} from '../session/has-scope.decorator';
import {ArticleEntity} from '../database/article.entity';
import {UserRepository} from '../database/user.repository';
import {ArticleRepository} from '../database/article.repository';
import {ArticleCreateInput, ArticleUpdateInput} from './article.input';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => ArticleModel)
export class ArticleResolver {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepo: UserRepository,
    private readonly articleRepo: ArticleRepository
  ) {}

  @ResolveField('user', () => UserModel, {nullable: true})
  getUser(@Parent() {userID}: ArticleEntity): Promise<UserModel> {
    return this.userRepo.findOneOrFail({id: userID});
  }

  @Query(() => ArticleModel)
  async article(@Args('id') id: number): Promise<ArticleEntity> {
    return this.articleRepo.findOneOrFail({id});
  }

  @Query(() => [ArticleModel])
  articles(@Args() articleArgs: ArticleArgs): Promise<ArticleEntity[]> {
    return this.articleRepo._find(
      omit(articleArgs, 'other'),
      articleArgs.other
    );
  }

  @Mutation(() => ArticleModel)
  @HasScope('manageArticles')
  async articleCreate(
    @Args('newArticle') articleCreateInput: ArticleCreateInput,
    @GetUser() user: UserEntity
  ): Promise<ArticleEntity> {
    const createdAt = new Date().toISOString();
    const newArticle = await this.articleRepo.create({
      ...articleCreateInput,
      userID: user.id!,
      createdAt,
      updatedAt: createdAt,
    });
    return newArticle;
  }

  @Mutation(() => Boolean)
  @HasScope('manageArticles')
  async articleUpdate(
    @Args('id') id: number,
    @Args('articleChanges') articleChanges: ArticleUpdateInput
  ) {
    await this.articleRepo.update({id}, articleChanges);
    return true;
  }

  @Mutation(() => Boolean)
  @HasScope('manageArticles')
  async articleDelete(@Args('id') id: number) {
    await this.articleRepo.delete({id});
    return true;
  }
}
