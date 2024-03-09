import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { IUser } from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;
  async findByEmail(email: IUser['email']) {
    const userDB = await this.user.findOne({ where: { email } });
    return userDB ? userDB.get() : null;
  }

  async findById(id: IUser['id']) {
    const userDB = await this.user.findByPk(id);
    return userDB ? userDB.get() : null;
  }
}
