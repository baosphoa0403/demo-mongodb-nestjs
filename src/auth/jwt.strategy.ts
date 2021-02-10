import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private auth){
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'secret'
      })
  }
}