import { Controller, Post, Body, Get, Param, Res, HttpStatus, Put, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-dto';
import { Cat } from './schema/schema-dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

  @Post("/create")
  @UsePipes(ValidationPipe)
  async create(@Res() res, @Body() createCatDto: CreateCatDto): Promise<CreateCatDto> {
    console.log(createCatDto);
    const cat = await this.catsService.create(createCatDto);
    return res.status(HttpStatus.OK).json({
      message: "create success",
      cat
    })
  }

  @Get("/getAll")
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get("/get/:id")
  async findByID(@Res() res,@Param("id") id: string): Promise<Cat> {
    console.log(id);
    const catFound =  await this.catsService.findById(id);
    return res.status(HttpStatus.OK).json({
      message: "succes",
      catFound
    })
  }

  @Put("/update/:id")
  async update(@Res() res,@Param("id") id: string, @Body() body): Promise<Cat> {
    console.log(body);
    const catupdate = await this.catsService.update(id, body);
    return  res.status(HttpStatus.OK).json({
      message: "update success",  
      catupdate
    })
  }

  @Get("/findPerson/:id")
  async findPersonOfCat(@Res() res,@Param("id") id: string): Promise<Cat> {
    const personOfCat = await this.catsService.findPersonOfCat(id);
    return  res.status(HttpStatus.OK).json({
      message:  `${personOfCat.name} is cat of  ${personOfCat.person.name} `
    })
  }
} 
