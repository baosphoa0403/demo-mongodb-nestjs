import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonsModule } from './persons/persons.module';
import { LoggerMiddleware } from './middleware/middleware';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://giabao:123@cluster0.yidxu.mongodb.net/Cat?retryWrites=true&w=majority'),
    CatsModule, 
    PersonsModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes(CatsController)
  }
}
