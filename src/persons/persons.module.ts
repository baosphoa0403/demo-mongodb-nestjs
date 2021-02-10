import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema, PersonDocument } from './schema/schema-dto';
import * as bcrypt from 'bcrypt';
// console.log(Person.name);
import * as mongoose from "mongoose";

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MongooseModule.forFeatureAsync([
      {name: Person.name,
       useFactory: () => {
        const schema = PersonSchema;
        schema.pre<PersonDocument>('save', async function (next:  mongoose.HookNextFunction) {
          const person: Person  = this;

          if (person) {
          const hashedPassword = await bcrypt.hash(person.Password, person.Password.length);
          person.Password = hashedPassword;
          console.log("hashedPassword");
          
          next();
          }
        });
        // schema.methods.comparePasswords = async (submittedPassword) =>  {
        //   const person: Person = this;
        //    if (person) {
        //     await bcrypt.compare(submittedPassword, person.Password);
        //    }
        //    console.log("comparePasswords");
        // };
        return schema;
       },
      //  inject: [PersonsModule]
      },
    ])
  ],
  providers: [PersonsService],
  controllers: [PersonsController],
  exports: [PersonsService],
})
export class PersonsModule {}
