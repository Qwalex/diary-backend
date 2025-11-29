import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotesModule } from './notes/notes.modules';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NotesModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
