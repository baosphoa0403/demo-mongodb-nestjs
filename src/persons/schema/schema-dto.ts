import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { Cat } from 'src/cats/schema/schema-dto';
import bcrypt from "bcrypt"
export type PersonDocument = Person & Document;

@Schema()
export class Person {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Cat"}]})
  Cats: Cat[]
}
export const PersonSchema = SchemaFactory.createForClass(Person);
