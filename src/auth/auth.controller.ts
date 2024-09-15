import { Body, Controller, Post } from '@nestjs/common';
import { UserSignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() userSignupDto: UserSignupDto) {
        return this.authService.signup(userSignupDto)
    }
    
    @Post('login')
    logn(@Body() userLoginDto: UserLoginDto) {
        return this.authService.login(userLoginDto)
    }

}
