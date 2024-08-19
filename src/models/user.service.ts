import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createOrUpdate(user: User): Promise<User> {
    console.log(user.getPassword());
    const hash: string = await bcrypt.hash(user.getPassword(), 10);
    user.setBalance(1000);
    user.setPassword(hash ? hash : '');
    return this.userRepository.save(user);
  }
}
