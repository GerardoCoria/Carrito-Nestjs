import { HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(id: string) {
    const user = await this.userModel.findOne({email: id}).exec();
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario #${id}.`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const searchUser = await this.userModel.findOne({email: data.email}).exec()
    if(searchUser){
      throw new HttpException('Usuario ya registrado', HttpStatus.FORBIDDEN)
    }
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const userCreated = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...rta} = userCreated.toJSON();
    return rta;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario #${id}.`);
    }
    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
