import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DiscsModule } from './discs/discs.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helper/env.helper';
import { validate } from './common/helper/env.validation';
import { TypeOrmConfigService } from './database/typeorm.service';
import { AuthModule } from './auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ validate, envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    OrdersModule,
    DiscsModule,
    ProductsModule,
    SalesModule,
    WishlistModule,
    FilesModule,
    AuthModule
  ]
})
export class AppModule {}
