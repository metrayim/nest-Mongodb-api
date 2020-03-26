

import { Controller, Get,Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Products')
@ApiTags('Product')
export class ProductsController {
  constructor(private readonly productsService:ProductsService) {}

  @Post()
 async addProduct(
     @Body('title') prodTitle:string,
     @Body('desc') prodDecs:string,
     @Body('price') prodPrice:number
     ){
     const generateId= await this.productsService.insertProduct(prodTitle,prodDecs,prodPrice);
     console.log(prodDecs,prodPrice,prodTitle,"add")
       return {id:generateId}
    
  }
  @Get()
 async getAllProducts(@Param() id){
      const products= this.productsService.getAllProducts();
      return products;

  }
  @Get(':id')
  getAllProduct(@Param('id') id:string){
      return this.productsService.getAllProduct(id);

  }
  @Patch(":id")
 async updateProduct(
     @Param('id') id:string,
     @Body('title') prodTitle:string,
     @Body('desc') prodDecs:string,
     @Body('price') prodPrice:number)
     {
    await this.productsService.UpdateProduct(id,prodTitle,prodDecs,prodPrice)
    console.log(id,prodPrice,prodTitle,prodDecs,'hehe')
      return null;

  }
  @Delete(':id')
  removeProduct(@Param('id') id:string){
      this.productsService.removeProduct(id);
      return 'Now it delete'
  }
}
