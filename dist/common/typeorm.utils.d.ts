import { Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Connection, ConnectionOptions } from 'typeorm';
export declare function getRepositoryToken(
  entity: Function,
  connection?: Connection | ConnectionOptions | string,
): string;
export declare function getCustomRepositoryToken(repository: Function): string;
export declare function getConnectionToken(
  connection?: Connection | ConnectionOptions | string,
): string | Function | Type<Connection>;
export declare function getConnectionPrefix(
  connection?: Connection | ConnectionOptions | string,
): string;
export declare function getEntityManagerToken(
  connection?: Connection | ConnectionOptions | string,
): string | Function;
export declare function handleRetry(
  retryAttempts?: number,
  retryDelay?: number,
): <T>(source: Observable<T>) => Observable<T>;
export declare function getConnectionName(options: ConnectionOptions): string;
export declare const generateString: () => string;
