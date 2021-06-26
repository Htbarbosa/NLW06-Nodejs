import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
interface IAuthenticaterequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticaterequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        // VERIFICAR SE EMAIL EXISTE
        const user = await usersRepositories.findOne({
            email
        })
        if (!user) {
            throw new Error("Email/Password incorrect");
        }
        //VERIFICAR SE AS SENHAS BATEM
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        //GERAR O TOKEN -- JWT
        const token = await sign({
            email: user.email
        }, "bd9fbf3a97a33b02d4fb49db20dd6fb8", {
            subject: user.id,
            expiresIn: "1d"
        });
        return token
    }
}

export { AuthenticateUserService }