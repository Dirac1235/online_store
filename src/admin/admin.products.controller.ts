import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Render,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/models/product.entity';
import { ProductService } from 'src/models/products.service';
import { ProductValidator } from 'src/validators/product.validator';
import * as fs from 'node:fs';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class ProductDto {
  @ApiProperty({ example: 'Camera' })
  name: string;
  @ApiProperty({ example: 'I is used to capture things' })
  description: string;
  @ApiProperty({ example: 500 })
  price: number;
  @ApiProperty({ example: 'img.jpg/png' })
  image: File;
}

@Controller('/admin/products')
@ApiTags('/admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductService) {}
  @Get('/')
  @ApiOperation({ summary: 'Views the admin products page' })
  @ApiResponse({ status: 200, description: 'admin products page' })
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }
  @Post('/store')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been created.' })
  @UseInterceptors(FileInterceptor('image'))
  @Redirect('/admin/products')
  async store(
    @Req() request,
    @Body() body: ProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageCreate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
    } else {
      const newProduct = new Product();
      newProduct.setName(body.name);
      newProduct.setDescription(body.description);
      newProduct.setPrice(body.price);
      newProduct.setImage(file.filename);
      await this.productsService.createOrUpdate(newProduct);
    }
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes product' })
  @ApiResponse({ status: 201, description: 'The product has been Deleted.' })
  @Redirect('/admin/products')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Views the Edit page' })
  @ApiResponse({ status: 201, description: 'Edit Page' })
  @Render('admin/products/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return {
      viewData: viewData,
    };
  }
  @Put('/:id/update')
  @ApiOperation({ summary: 'Edits page' })
  @ApiResponse({ status: 201, description: 'The product have been edited' })
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async update(
    @Body() body: ProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const product = await this.productsService.findOne(id);
    product.setName(body.name);
    product.setDescription(body.description);
    product.setPrice(body.price);
    if (file) {
      product.setImage(file.filename);
    }
    await this.productsService.createOrUpdate(product);
  }
}
