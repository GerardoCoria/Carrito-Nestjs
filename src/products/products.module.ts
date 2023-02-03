import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from './services/products.service'
import { Product,  ProductSchema, ProductCartSchema, ProductCart} from "./entities/product.entity";
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { Brand, BrandSchema } from './entities/brand.entity';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema
      },
      {
        name:Category.name,
        schema: CategorySchema
      },
      {
        name:ProductCart.name,
        schema: ProductCartSchema
      }
    ]),
  ],
  controllers:[ProductsController, BrandsController, CategoriesController],
  providers:[ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule {}
