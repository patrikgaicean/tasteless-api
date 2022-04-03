import { Request } from 'express';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/entities/user.entity';
 
export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestWithUserDto extends Request {
  user: UserDto; // this is returned by JWT validation
}
