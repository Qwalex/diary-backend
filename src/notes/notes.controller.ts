import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from 'generated/prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes(): Promise<{ notes: Note[] }> {
    return await this.notesService.getNotes();
  }

  @Post()
  async createNote(@Body() note: Note): Promise<{ note: Note }> {
    return await this.notesService.createNote(note);
  }

  @Get(':id')
  async getNote(@Param('id') id: string): Promise<{ note: Note | null }> {
    return await this.notesService.getNote(Number(id));
  }

  @Patch(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() note: Note,
  ): Promise<{ note: Note }> {
    return await this.notesService.updateNote(Number(id), note);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<{ note: Note }> {
    return await this.notesService.deleteNote(Number(id));
  }
}
