import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Usuario } from '../../../infrastructure/database/entities';
import { IAuthRepository } from '../../../domain/repositories/auth.repository.interface';
import { ISharedRepository } from 'src/domain/repositories/shared.repository.interface';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ISharedRepository') private readonly sharedRepository: ISharedRepository,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, senha } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    const payload = {
      userId: user.usuario_id,
      email: user.email,
      cargo: user.cargo,
    };
    const secret = this.configService.get<string>('JWT_SECRET') || 'your_jwt_secret';
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '5h';

    const accessToken = jwt.sign(payload, secret, { expiresIn });

    return { accessToken };
  }

  async register(registerDto: RegisterUserDto): Promise<Partial<Usuario>> {
    const { email, senha, cargo_id, regiao_id, cidade_id, ...rest } = registerDto;

    const { cargo, cidade, regiao } = await this.sharedRepository.getRelatedEntities(cargo_id, cidade_id, regiao_id); //parametros na ordem correta

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    return await this.userRepository.register({
      ...rest,
      email,
      senha: hashedPassword,
      cargo,
      cidade,
      regiao,
    });
  }
}
