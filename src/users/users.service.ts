import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'generated/prisma/client';
import { isEmptyString } from '../utils/validation';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private validateCreateUserPayload = (user: Partial<User>): void => {
    if (!user) {
      throw new BadRequestException('Пустое тело запроса');
    }

    const missingFields: string[] = [];

    if (isEmptyString(user.email)) {
      missingFields.push('email');
    }

    if (isEmptyString(user.password)) {
      missingFields.push('password');
    }

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Отсутствуют обязательные параметры: ${missingFields.join(', ')}`,
      );
    }
  };

  getUsers = async (): Promise<{ users: User[] }> => {
    const users = await this.prisma.user.findMany();

    return { users };
  };

  createUser = async (user: User): Promise<{ user: User }> => {
    this.validateCreateUserPayload(user);

    const { email, password } = user;

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return { user: newUser };
  };

  getUser = async (id: number): Promise<{ user: User | null }> => {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return { user };
  };

  updateUser = async (id: number, user: User): Promise<{ user: User }> => {
    const { email, password } = user;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
      },
    });

    return { user: updatedUser };
  };

  deleteUser = async (id: number): Promise<{ user: User }> => {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return { user: deletedUser };
  };
}
