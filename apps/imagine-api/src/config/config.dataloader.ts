import {In} from 'typeorm';
import {execSync} from 'child_process';
import {Injectable} from '@nestjs/common';
import {ConfigModel} from './config.model';
import {ConfigRepository} from '../database/config.repository';
import {BaseDataloaderService} from '../utility/base.dataloader';

@Injectable()
export class ConfigDataloaderService extends BaseDataloaderService<ConfigModel> {
  constructor(private readonly configRepo: ConfigRepository) {
    super(async (ids: number[]) => {
      if (ids.length === 0) {
        return [];
      }

      const matchingConfig = await this.configRepo._find({
        id: In(ids),
      });

      const commitHash = execSync('git rev-parse HEAD').toString().trim();

      return [
        {
          ...matchingConfig,
          softwareVersion: commitHash,
        },
      ];
    });
  }
}
