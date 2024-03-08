import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { IUser } from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;
  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const userDB = await this.user.findOne({ where: { email } });
    return userDB ? userDB.get() : null;
  }
}
