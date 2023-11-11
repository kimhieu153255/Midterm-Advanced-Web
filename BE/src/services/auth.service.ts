import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { BadRequestException, HttpException, NotFoundException } from '@/core/error.response';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import UserModel from '@/models/users.model';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ username: userData.username });
    if (findUser) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: User): Promise<{ cookie: string; token: string }> {
    const findUser: User = await UserModel.findOne({ username: userData.username });
    if (!findUser) throw new NotFoundException(`This username ${userData.username} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new BadRequestException('Wrong password');

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, token: tokenData.token };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ username: userData.username, password: userData.password });
    if (!findUser) throw new NotFoundException(`This username ${userData.username} was not found`);

    return findUser;
  }
}
