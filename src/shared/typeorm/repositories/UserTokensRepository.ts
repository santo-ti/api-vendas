import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '@entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const entity = await this.findOne({
      where: {
        token,
      },
    });

    return entity;
  }

  public async generate(userId: string): Promise<UserToken | undefined> {
    const entity = await this.create({
      userId,
    });

    return this.save(entity);
  }
}
