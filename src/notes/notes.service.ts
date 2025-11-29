import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Note } from 'generated/prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotes(): Promise<{ notes: Note[] }> {
    const notes = await this.prisma.note.findMany();

    return { notes };
  }

  async createNote(note: Note): Promise<{ note: Note }> {
    const newNote = await this.prisma.note.create({
      data: note,
    });

    return { note: newNote };
  }

  async getNote(id: number): Promise<{ note: Note | null }> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    return { note };
  }

  async updateNote(id: number, note: Note): Promise<{ note: Note }> {
    const { title, content } = note;

    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return { note: updatedNote };
  }

  async deleteNote(id: number): Promise<{ note: Note }> {
    const deletedNote = await this.prisma.note.delete({
      where: { id },
    });

    return { note: deletedNote };
  }
}
