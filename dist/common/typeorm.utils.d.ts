import { Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Connection, ConnectionOptions, Repository } from 'typeorm';
import { EntityClassOrSchema } from '../interfaces/entity-class-or-schema.type';
export declare function getRepositoryToken(
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string,
): string;
export declare function getCustomRepositoryToken(
  repository: Repository<any>,
): string;
export declare function getConnectionToken(
  connection?: Connection | ConnectionOptions | string,
): string | Type<Connection>;
export declare function getConnectionPrefix(
  connection?: Connection | ConnectionOptions | string,
): string;
export declare function getEntityManagerToken(
  connection?: Connection | ConnectionOptions | string,
): string;
export declare function handleRetry(
  retryAttempts?: number,
  retryDelay?: number,
  connectionName?: string,
  verboseRetryLog?: boolean,
  toRetry?: (err: any) => boolean,
): <T>(source: Observable<T>) => Observable<T>;
export declare function getConnectionName(options: ConnectionOptions): string;
export declare const generateString: () => string;
