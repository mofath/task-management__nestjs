
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signupDto';
import { IUser, User } from '../../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async signup(signupDto: SignupDto): Promise<IUser> {
    let { username, password } = signupDto;

    password = await this.hashPassword(password, '10');

    try {
      const user = new User({
        username,
        password,
      });

      await user.save();

      return user;
    } catch (error) {
      console.log(error);
    }
  }


  async hashPassword(password:string, salt: string): Promise<string>{
    return bcrypt.hash(password, salt)
  }
}
