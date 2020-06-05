import { Provider } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
import { getConnectionToken, getRepositoryToken } from './common/typeorm.utils';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';

export function createTypeOrmProviders(
  entities?: EntityClassOrSchema[],
  connection?: Connection | ConnectionOptions | string,
): Provider[] {
  return (entities || []).map((entity) => ({
    provide: getRepositoryToken(entity, connection),
    useFactory: (connection: Connection) => {
      return connection.options.type === 'mongodb'
        ? connection.getMongoRepository(entity)
        : connection.getRepository(entity);
    },
    inject: [getConnectionToken(connection)],
  }));
}
