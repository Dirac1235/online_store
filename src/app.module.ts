import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductService } from './models/products.service';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { UserService } from './models/user.service';
import { AuthModule } from './auth/auth.module';
import { User } from './models/user.entity';
import { CartModule } from './cart/cart.module';
import { Order } from './models/order.entity';
import { OrderService } from './models/orders.service';
import { AccountModule } from './account/account.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'online_store',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User, Order]),
    AdminModule,
    AuthModule,
    CartModule,
    AccountModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductService, UserService, OrderService],
  exports: [ProductService, UserService, OrderService],
})
export class AppModule {}
