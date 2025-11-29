import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<{ users: User[] }> {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() user: User): Promise<{ user: User }> {
    return await this.usersService.createUser(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<{ user: User | null }> {
    return await this.usersService.getUser(Number(id));
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<{ user: User }> {
    return await this.usersService.updateUser(Number(id), user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ user: User }> {
    return await this.usersService.deleteUser(Number(id));
  }
}
