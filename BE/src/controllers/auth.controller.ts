import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Created, SuccessResponse } from '@/core/success.response';

export class AuthController {
  public authService = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, _next: NextFunction) => {
    const userData: User = req.body;
    const signUpUserData: User = await this.authService.signup(userData);

    new Created({ message: 'signup', metadata: { id: signUpUserData._id } }).send(res);
  };

  public logIn = async (req: Request, res: Response, _next: NextFunction) => {
    const userData: User = req.body;
    const { cookie, token } = await this.authService.login(userData);

    new SuccessResponse({
      message: 'login',
      metadata: { token },
    }).send(res, { 'Set-Cookie': cookie });
  };

  public logOut = async (req: RequestWithUser, res: Response, _next: NextFunction) => {
    const userData: User = req.user;
    const logOutUserData: User = await this.authService.logout(userData);

    new SuccessResponse({ message: 'logout', metadata: { id: logOutUserData._id } }).send(res, { 'Set-Cookie': 'Authorization=; Max-Age=0;' });
  };
}
