import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { CreatePersonDto, loginPersonDTO } from './dto/create-dto';
import { PersonsService } from './persons.service';
import { Person } from './schema/schema-dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Post('/create')
  async create(
    @Res() res,
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<Person> {
    // console.log(createPersonDto);
    const person = await this.personService.createPerson(createPersonDto);
    console.log(person);

    return res.status(HttpStatus.OK).json({
      message: 'create success',
      person,
    });
  }

  @Get('/getALl')
  async getALlPerson(@Res() res): Promise<Person[]> {
    // console.log(res);
    const listPerson = await this.personService.getAllPerson();

    return res.status(HttpStatus.OK).json({
      message: 'get success',
      listPerson,
    });
  }
  @Get('/getByID/:id')
  async getById(@Res() res, @Param('id') id): Promise<Person> {
    const person = await this.personService.getById(id);
    if (!person) {
      throw new NotFoundException(`person not found with id ${id}`);
    }
    return res.status(HttpStatus.OK).json({
      message: 'get success',
      person,
    });
  }
  @Delete('/delete/:id')
  async detelePerson(@Res() res, @Param('id') id): Promise<Person> {
    const person = await this.personService.deletePerson(id);
    return res.status(HttpStatus.OK).json({
      message: 'delete success',
      person,
    });
  }
  @Put('/update/:id')
  async updatePerson(
    @Res() res,
    @Param('id') id,
    @Body() data,
  ): Promise<Person> {
    console.log(data);

    const person = await this.personService.updatePerson(id, data);
    return res.status(HttpStatus.OK).json({
      message: 'update success',
      person,
    });
  }
  // async getInfo(@Res() res, @Param() id)
  @Get('/getAllCatOfPerson/:id')
  async getAllCat(@Res() res, @Param('id') id): Promise<Person> {
    const person = await this.personService.getAllCatOfPerson(id);
    return res.status(HttpStatus.OK).json({
      message: 'update success',
      person,
    });
  }

  @Post('/login')
  async loginPerson(@Body() body, @Res() res): Promise<Person> {
    const { name, Password } = body;
    const personlogin: loginPersonDTO = {
      name,
      Password,
    };
    const person = await this.personService.login(personlogin);
    console.log(person);

    return;
  }
}
