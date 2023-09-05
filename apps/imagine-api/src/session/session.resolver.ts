import {omit} from 'lodash';
import {JwtService} from '@nestjs/jwt';
import {SessionArgs} from './session.args';
import {GetUser} from './get-user.decorator';
import {PubSub} from 'graphql-subscriptions';
import {SessionService} from './session.service';
import {HashService} from '../common/hash.service';
import {HasSession} from './has-session.decorator';
import {UserEntity} from '../database/user.entity';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import {SessionEntity} from '../database/session.entity';
import {UserRepository} from '../database/user.repository';
import {SessionDataloaderService} from './session.dataloader';
import {SessionRepository} from '../database/session.repository';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {
  SessionDisconnectAccountInput,
  SessionUpdateEmailInput,
  SessionUpdatePasswordInput,
} from './session.input';
import {
  SessionCreatedModel,
  SessionDisconnectAccountModel,
  SessionModel,
  SessionSSOModel,
  SessionUpdateEmailModel,
  SessionUpdatePasswordModel,
} from './session.model';

const pubSub = new PubSub();

@Resolver(() => SessionModel)
export class SessionResolver {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly sessionRepo: SessionRepository,
    private readonly sessionService: SessionService,
    private readonly sessionDataLoaderService: SessionDataloaderService
  ) {}

  @Query(() => SessionSSOModel)
  @HasSession()
  async sessionSSOCreate(
    @GetUser() user: UserEntity
  ): Promise<SessionSSOModel> {
    const newSSO = await this.userRepo.generateSSO(user.id!);
    return {
      ssoToken: newSSO,
    };
  }

  @Query(() => SessionModel)
  async sessionByJWT(@Args('jwt') jwt: string): Promise<SessionEntity> {
    const parsedJWT: {sessionID: number} = this.jwtService.decode(jwt) as any;
    return this.sessionRepo.findOneOrFail({id: parsedJWT.sessionID});
  }

  @Query(() => SessionModel)
  @HasSession()
  async session(
    @Args('id') id: number,
    @GetUser() user: UserEntity
  ): Promise<SessionEntity> {
    const session = await this.sessionDataLoaderService.loadById(id);
    this.ownsResource(session, user);
    return session;
  }

  @Query(() => [SessionModel])
  @HasSession()
  sessions(
    @Args() sessionArgs: SessionArgs,
    @GetUser() user: UserEntity
  ): Promise<SessionEntity[]> {
    return this.sessionRepo._find(
      {...omit(sessionArgs, 'other'), userID: user.id!},
      sessionArgs.other
    );
  }

  @Mutation(() => SessionCreatedModel)
  async sessionCreate(
    @Args('username') username: string,
    @Args('password') password: string
  ): Promise<SessionCreatedModel> {
    const newSession = await this.sessionService.loginWithUsernameAndPassword(
      username,
      password
    );
    pubSub.publish('sessionCreated', {sessionCreated: newSession});
    return newSession;
  }

  @Mutation(() => SessionUpdateEmailModel)
  @HasSession()
  async sessionUpdateEmail(
    @Args('input', {type: () => SessionUpdateEmailInput})
    input: SessionUpdateEmailInput,
    @GetUser() user: UserEntity
  ): Promise<SessionUpdateEmailModel> {
    const doesPasswordMatch = this.hashService.compare(
      user.password,
      input.password
    );
    if (!doesPasswordMatch) {
      throw new UnauthorizedException();
    }
    await this.userRepo.update({id: user.id!}, {email: input.email});
    return {
      success: true,
    };
  }

  @Mutation(() => SessionUpdatePasswordModel)
  @HasSession()
  async sessionUpdatePassword(
    @Args('input', {type: () => SessionUpdatePasswordInput})
    input: SessionUpdatePasswordInput,
    @GetUser() user: UserEntity
  ): Promise<SessionUpdatePasswordModel> {
    const doesPasswordMatch = this.hashService.compare(
      user.password,
      input.currentPassword
    );
    if (!doesPasswordMatch) {
      throw new UnauthorizedException();
    }
    await this.userRepo.update({id: user.id!}, {password: input.newPassword});
    return {
      success: true,
    };
  }

  @Mutation(() => SessionDisconnectAccountModel)
  @HasSession()
  async sessionDisconnectDiscord(
    @Args('input', {type: () => SessionDisconnectAccountInput})
    input: SessionDisconnectAccountInput,
    @GetUser() session: UserEntity
  ): Promise<SessionDisconnectAccountModel> {
    if (!input.confirm) {
      throw new BadRequestException();
    }
    await this.userRepo.update({id: session.id!}, {discordID: null as any});
    return {success: true};
  }

  @Mutation(() => SessionDisconnectAccountModel)
  @HasSession()
  async sessionDisconnectFacebook(
    @Args('input', {type: () => SessionDisconnectAccountInput})
    input: SessionDisconnectAccountInput,
    @GetUser() session: UserEntity
  ): Promise<SessionDisconnectAccountModel> {
    if (!input.confirm) {
      throw new BadRequestException();
    }
    await this.userRepo.update({id: session.id!}, {facebookID: null as any});
    return {success: true};
  }

  @Mutation(() => SessionDisconnectAccountModel)
  @HasSession()
  async sessionDisconnectGoogle(
    @Args('input', {type: () => SessionDisconnectAccountInput})
    input: SessionDisconnectAccountInput,
    @GetUser() session: UserEntity
  ): Promise<SessionDisconnectAccountModel> {
    if (!input.confirm) {
      throw new BadRequestException();
    }
    await this.userRepo.update({id: session.id!}, {googleID: null as any});
    return {success: true};
  }

  @Subscription(() => SessionModel)
  sessionCreated() {
    return pubSub.asyncIterator('sessionCreated');
  }

  private ownsResource(session: SessionEntity, authenticatedUser: UserEntity) {
    if (Number(session.userID) !== Number(authenticatedUser.id)) {
      throw new UnauthorizedException('');
    }
  }
}
