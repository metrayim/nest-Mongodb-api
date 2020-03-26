import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        //Code without database
        //    const prodId=new Date().toString()
        //    const newProduct=new this.productModel(prodId,title,desc,price);
        //    this.products.push(newProduct)
        //    console.log(desc);
        //    return prodId;

        const newProduct = new this.productModel({
            title, //title=title remake
            desc,
            price
        });
        const result = await newProduct.save();
        return result.id as string;

    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => (
            {
                id: prod.id,
                title: prod.title,
                desc: prod.desc,
                price: prod.price
            }
        ))
        //    return [...this.products];
    }
    async getAllProduct(productId: string) {

        const product = await this.findProduct(productId)
        return {
            id: product.id,
            title: product.title,
            desc: product.desc,
            price: product.price
        }
        //    const product=this.findProduct(productId)[0]
        //    return {...product}
        //    const product=this.products.find(prod=>prod.id===productId);
        //    if(!product){
        //        throw new NotFoundException('not found for data ');
        //    }
        //    return {...product};
    }
    async UpdateProduct(
        productId: string,
        prodTitle: string,
        proddesc: string,
        prodPrice: number
    ) {
        //     // const [product,index]=this.findProduct(productId);
            const updateProduct=await this.findProduct(productId)
            
            if(prodTitle){
                updateProduct.title=prodTitle;

            }
            if(proddesc){
                updateProduct.desc=proddesc;
            }
            if(prodPrice){
                updateProduct.price=prodPrice;
            }
           updateProduct.save()
    }

    // private findProduct(id:string):[Product,number]{
    //     const productIndex=this.products.findIndex(prod=>prod.id===id);
    //     const product=this.products[productIndex]
    //     if(!product){
    //         throw new NotFoundException('not found for data ');
    //     }
    //     return [product,productIndex];
    // }
    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();

        } catch (error) {
            throw new NotFoundException("Could not find product.")
        }
        if (!product) {
            throw new NotFoundException('Could not ifnd product.')
        }
        return product;
    }

    async  removeProduct(id: string) {
        const result = await this.productModel.deleteOne({ _id: id }).exec()
        if (result.n === 0) {
            throw new NotFoundException("Could not find product.")
        }
        // const index=this.findProduct(id)[1];
        // console.log(index)
        // this.products.splice(index,1)
        // const productIndex=this.products.findIndex(prod=>prod.id===id);
        // if(!id){
        //     throw new NotFoundException('not found for Id');
        // }          
        // return this.products.slice(productIndex,1);
    }

}
