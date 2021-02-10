import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/schema-dto';

// console.log(Cat.name);

@Module({
  imports: [MongooseModule  .forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatsService],
  controllers: [CatsController]
})
export class CatsModule {}
