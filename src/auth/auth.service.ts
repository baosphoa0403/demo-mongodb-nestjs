import { Injectable } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';
import {sign} from "jsonwebtoken";
@Injectable()
export class AuthService { 
    constructor(private personService: PersonsService){}
    async signPayload(payload: any){
        return sign(payload, 'secretkey', {expiresIn: '12h'})
    }
    async validateUser(payload: any){
        // return await this.personService.
    }
}
