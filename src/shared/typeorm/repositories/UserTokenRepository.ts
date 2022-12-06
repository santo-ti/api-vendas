import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '@entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const entity = await this.findOne({
      where: {
        token,
      },
    });

    return entity;
  }

  public async generate(userId: string): Promise<UserToken> {
    const entity = this.create({
      userId,
    });

    return this.save(entity);
  }
}
