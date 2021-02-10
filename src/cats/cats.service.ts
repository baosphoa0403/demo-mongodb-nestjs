import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schema/schema-dto';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save(); 
  }
  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
  async findById(id: string): Promise<Cat> {
    // return await this.catModel.find(id);
    const catFound = await this.catModel.findById(id)  
    if (!catFound) {
      throw new NotFoundException(`the cat not found with ${id}`)
    }
    return catFound
  }
  async update(id: string, body: any): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec()
    if (!cat) {
      throw new NotFoundException(`the cat not found with ${id}`)
    }
    cat.name = body.name || cat.name;
    cat.age = body.age || cat.age;
    cat.breed = body.bread || cat.breed;
    return await cat.save();
  }
  // tìm chủ của con mèo
  async findPersonOfCat(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).populate("person")
    console.log(cat);
    
    return cat
  }
}
