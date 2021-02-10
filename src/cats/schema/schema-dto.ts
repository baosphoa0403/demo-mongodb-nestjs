import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { Person } from 'src/persons/schema/schema-dto';
export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;
  
  @Prop()
  age: number;

  @Prop()
  breed: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Person"})
  person: Person;

}
export const CatSchema = SchemaFactory.createForClass(Cat);