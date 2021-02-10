import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Person, PersonDocument } from './schema/schema-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonDto, loginPersonDTO } from './dto/create-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = await this.personModel.findOne({
      name: createPersonDto.name,
    });
    if (person) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createPerson = new this.personModel(createPersonDto);
    return await createPerson.save();
  }
  async getAllPerson(): Promise<Person[]> {
    return await this.personModel.find({});
  }
  async getById(id: string): Promise<Person> {
    return await this.personModel.findById({ _id: id });
  }
  async deletePerson(id: string): Promise<Person> {
    const person = await this.personModel.findById({ _id: id });
    return await person.remove();
  }
  async updatePerson(id: string, data: Person): Promise<Person> {
    const person = await this.personModel.findById({ _id: id });
    person.name = data.name || person.name;
    person.age = data.age || person.age;
    person.Email = data.Email || person.Email;
    person.Password = data.Password || person.Password;
    return await person.save();
  }

  async getAllCatOfPerson(id): Promise<Person> {
    const person = await this.personModel.findById(id).populate('Cats');
    console.log(person);

    return person;
  }
  // async login(name: string, password: string) {
  //   return;
  // }

  async login(person: loginPersonDTO): Promise<Person> {
    const { name, Password } = person;
    const user: any = this.personModel.findOne({ name });
    console.log(user.name);
    if (!user) {
      throw new HttpException('name is wrong', HttpStatus.UNAUTHORIZED);
    }
    const checked = await bcrypt.compare(Password, user.Password);
    console.log('checked', checked);
    if (checked) {
      return user;
    } else {
      throw new HttpException('password wrong', HttpStatus.UNAUTHORIZED);
    }
  }
}
