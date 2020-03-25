import { Injectable,NotFoundException } from '@nestjs/common';
import {Product} from './product.model'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'morgan'

@Injectable()
export class ProductsService {
   private products:Product[]=[];

   constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

 async insertProduct(title:string,desc:string,price:number){
       //Code without database
    //    const prodId=new Date().toString()
    //    const newProduct=new this.productModel(prodId,title,desc,price);
    //    this.products.push(newProduct)
    //    console.log(desc);
    //    return prodId;
  
    const newProduct=new this.productModel({
        title, //title=title remake
        desc,
        price
    });
   const result= await newProduct.save();
   return result.id as string;

    console.log(result,'Hi metra');
   }

   getAllProducts(){
       return [...this.products];
   }
   getAllProduct(productId:string){
       const product=this.findProduct(productId)[0]
       return {...product}
    //    const product=this.products.find(prod=>prod.id===productId);
    //    if(!product){
    //        throw new NotFoundException('not found for data ');
    //    }
    //    return {...product};
        }
        UpdateProduct(productId:string,prodTitle:string,proddesc:string,prodPrice:number)
        {
            const [product,index]=this.findProduct(productId);
            const updateProduct={...product};
            if(prodTitle){
                updateProduct.title=prodTitle;

            }
            if(proddesc){
                updateProduct.desc=proddesc;
            }
            if(prodPrice){
                updateProduct.price=prodPrice;
            }
            this.products[index]=updateProduct;
        }
    
        private findProduct(id:string):[Product,number]{
            const productIndex=this.products.findIndex(prod=>prod.id===id);
            const product=this.products[productIndex]
            if(!product){
                throw new NotFoundException('not found for data ');
            }
            return [product,productIndex];
        }

        removeProduct(id:string){
            const index=this.findProduct(id)[1];
            console.log(index)
            this.products.splice(index,1)
            // const productIndex=this.products.findIndex(prod=>prod.id===id);
            // if(!id){
            //     throw new NotFoundException('not found for Id');
            // }          
            // return this.products.slice(productIndex,1);
        }
  
}
