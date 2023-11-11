import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import asyncHandler from '@/helpers/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto), asyncHandler(this.authController.signUp));
    this.router.post(`${this.path}login`, ValidationMiddleware(LoginUserDto), asyncHandler(this.authController.logIn));
    this.router.post(`${this.path}logout`, authMiddleware, asyncHandler(this.authController.logOut));
  }
}
