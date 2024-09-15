import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserSignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { UserLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private jwtService: JwtService
    ) { }

    async signup(userSignupDto: UserSignupDto) {
        const { firstName, lastName, email, password } = userSignupDto

        // check if user already exitsts
        const userExitst = await this.UserService.findByEmail(email)
        if (userExitst) {
            throw new BadRequestException('Email already in use')
        }

        // Hash Password
        userSignupDto.password = await bcrypt.hash(password, 10)

        // create a new user by calling the create user method from user service
        const user = await this.UserService.createUser(userSignupDto)
        return user
    }

    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.UserService.findByEmail(email)
        if (!user) {
            return null
        }
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (!passwordCorrect) {
            return null
        }
        return user
    }

    async login(userLoginDto: UserLoginDto) {
        const { email, password } = userLoginDto

        // validate user
        const user = await this.validateUser({ email, password })
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const jwtPayload = { id: user._id }
        const accessToken = this.jwtService.sign(jwtPayload)
        return {
            accessToken,
            user,
            message: "Login Success"
        }
    }

}
