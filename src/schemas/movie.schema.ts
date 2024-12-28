import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: string;

  @Prop()
  poster: string;

  constructor(title: string, year: string, poster?: string) {
    this.title = title;
    this.year = year;
    this.poster = poster || '';  // Optional field, defaulting to empty string if not provided
  }
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
