import { Connection, ConnectionOptions } from 'typeorm';
declare type ConnectionToken = Connection | ConnectionOptions | string;
export declare class EntitiesMetadataStorage {
  private static readonly storage;
  static addEntitiesByConnection(
    connection: ConnectionToken,
    entities: Function[],
  ): void;
  static getEntitiesByConnection(connection: ConnectionToken): Function[];
}
export {};
