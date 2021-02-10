import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PersonsService } from 'src/persons/persons.service';

@Module({
  imports: [PersonsService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}