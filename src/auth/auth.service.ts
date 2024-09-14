import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService) {}
    
    async validateUser(data: any) {
        const user = await this.UserService.findByEmail(data.email)
        return user
    }
}
