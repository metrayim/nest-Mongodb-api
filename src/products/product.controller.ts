

import { Controller, Get,Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService:ProductsService) {}

  @Post()
 async addProduct(@Body('title') prodTitle:string,@Body('desc') prodDecs:string,@Body('price') prodPrice:number){
     const generateId= await this.productsService.insertProduct(prodTitle,prodDecs,prodPrice);
       return {id:generateId}
    
  }
  @Get()
  getAllProducts(@Param() id){
      return this.productsService.getAllProducts();

  }
  @Get(':id')
  getAllProduct(@Param('id') id:string){
      return this.productsService.getAllProduct(id);

  }
  @Patch(":id")
  updateProduct(@Param('id') id:string,@Body('title') prodTitle:string,@Body('desc') prodDecs:string,@Body('price') prodPrice:number){
     this.productsService.UpdateProduct(id,prodTitle,prodDecs,prodPrice)
      return null;

  }
  @Delete(':id')
  removeProduct(@Param('id') id:string){
      this.productsService.removeProduct(id);
      return 'Now it delete'
  }
}
