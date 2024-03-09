import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/IUserModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';
import { ILogin } from '../Interfaces/IUser';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(data: ILogin) {
    const userLogin = await this.userModel.findByEmail(data.email);
    if (userLogin) {
      if (!bcrypt.compareSync(data.password, userLogin.password)) {
        return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' },
        };
      }
      const token = this.jwtService.sign({ id: userLogin.id, email: userLogin.email });
      return { status: mapStatusHTTP.ok, data: { token } };
    }
    return { status: mapStatusHTTP.unauthorized, data: { message: 'Invalid email or password' } };
  }

  public async getUserByRole(id: number) {
    const user = await this.userModel.findById(id);
    if (!user) {
      return { status: mapStatusHTTP.notFound, data: { message: 'User not found' } };
    }
    return { status: mapStatusHTTP.ok, data: { role: user.role } };
  }
}
