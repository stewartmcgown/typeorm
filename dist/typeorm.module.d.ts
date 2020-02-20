import { DynamicModule } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from './interfaces/typeorm-options.interface';
export declare class TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule;
  static forFeature(
    entities?: Function[],
    connection?: Connection | ConnectionOptions | string,
  ): DynamicModule;
  static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule;
}
