import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ConnectionOptions } from 'typeorm';
export declare type TypeOrmModuleOptions = {
  retryAttempts?: number;
  retryDelay?: number;
  toRetry?: (err: any) => boolean;
  autoLoadEntities?: boolean;
  keepConnectionAlive?: boolean;
  verboseRetryLog?: boolean;
} & Partial<ConnectionOptions>;
export interface TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
}
export interface TypeOrmModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<TypeOrmOptionsFactory>;
  useClass?: Type<TypeOrmOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
  inject?: any[];
}
