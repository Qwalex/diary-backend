import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotesModule } from './notes/notes.modules';

@Module({
  imports: [NotesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
