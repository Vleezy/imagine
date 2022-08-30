import {RankEntity} from './rank.entity';
import {ObjectType} from '@nestjs/graphql';
import {SessionEntity} from './session.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {
  IMAGINE_DEFAULT_ACTIVITY_POINTS,
  IMAGINE_DEFAULT_CREDITS,
  IMAGINE_DEFAULT_HOME_ROOM,
  IMAGINE_DEFAULT_LOOK,
  IMAGINE_DEFAULT_MOTTO,
  IMAGINE_DEFAULT_VIP_POINTS,
  IMAGINE_DEFAULT_VIP_STATUS,
} from '../imagine.constant';
import {
  UserAllowingNewFriendsStatus,
  UserGender,
  UserMuteStatus,
  UserOnlineStatus,
  UserShowOnlineStatus,
  UserShowRoomStatus,
  UserVipStatus,
} from './user.types';
import {ArticleEntity} from './article.entity';

@Entity('users')
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  username!: string;

  @Column()
  password!: string;

  @Column({name: 'mail'})
  email!: string;

  @Column({name: 'auth_ticket'})
  gameSSO!: string;

  @Column({name: 'rank'})
  rankID: number = 1;

  @Column({name: 'rank_vip'})
  rankVipID: number = 1;

  @Column()
  credits: number = IMAGINE_DEFAULT_CREDITS;

  @Column({name: 'vip_points'})
  vipPoints: number = IMAGINE_DEFAULT_VIP_POINTS;

  @Column({name: 'activity_points'})
  activityPoints: number = IMAGINE_DEFAULT_ACTIVITY_POINTS;

  @Column()
  look: string = IMAGINE_DEFAULT_LOOK;

  @Column()
  gender!: UserGender;

  @Column()
  motto: string = IMAGINE_DEFAULT_MOTTO;

  @Column({name: 'account_created'})
  accountCreatedAt!: string; // ISO timestamp

  @Column({name: 'account_created'})
  lastOnline!: string; // ISO timestamp

  @Column({name: 'online'})
  onlineStatus: UserOnlineStatus = UserOnlineStatus.Offline;

  @Column({name: 'ip_last'})
  ipLast!: string;

  @Column({name: 'ip_reg'})
  ipRegisteredWith!: string;

  @Column({name: 'home_room'})
  homeRoomID: number = IMAGINE_DEFAULT_HOME_ROOM;

  @Column({name: 'is_muted'})
  muteStatus: UserMuteStatus = UserMuteStatus.NotMuted;

  @Column({name: 'block_newfriends'})
  allowingNewFriends: UserAllowingNewFriendsStatus = UserAllowingNewFriendsStatus.Yes;

  @Column({name: 'hide_online'})
  showOnlineStatus: UserShowOnlineStatus = UserShowOnlineStatus.Visible;

  @Column({name: 'hide_inroom'})
  showRoomStatus: UserShowRoomStatus = UserShowRoomStatus.Visible;

  @Column({name: 'vip'})
  vipStatus: UserVipStatus = IMAGINE_DEFAULT_VIP_STATUS;

  @ManyToOne(() => RankEntity, rank => rank.users)
  @JoinColumn({name: 'rank'})
  rank?: RankEntity;

  @ManyToOne(() => RankEntity, rank => rank.vipUsers)
  @JoinColumn({name: 'rank_vip'})
  rankVip?: RankEntity;

  @OneToMany(() => SessionEntity, session => session.user)
  sessions?: SessionEntity[];

  @OneToMany(() => ArticleEntity, article => article.user)
  articles?: ArticleEntity[];
}
