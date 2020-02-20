import { Provider } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
export declare function createTypeOrmProviders(
  entities?: Function[],
  connection?: Connection | ConnectionOptions | string,
): Provider[];
