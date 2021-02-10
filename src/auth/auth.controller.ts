import { Controller, Post } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';
import { CreatePersonDto, loginPersonDTO } from 'src/persons/dto/create-dto';

@Controller('auth')
export class AuthController {

    constructor(private personService: PersonsService){}

    @Post('login')
    async login (personDTO: loginPersonDTO){
        return await this.personService.login(personDTO)
    }
    @Post('register')
    async resgister(personDTO: CreatePersonDto){
       return await this.personService.createPerson(personDTO)
    }
}
