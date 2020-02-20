import { Connection, ConnectionOptions } from 'typeorm';
export declare const InjectRepository: (
  entity: Function,
  connection?: string,
) => (target: object, key: string | symbol, index?: number | undefined) => void;
export declare const InjectConnection: (
  connection?: Connection | ConnectionOptions | string,
) => ParameterDecorator;
export declare const InjectEntityManager: (
  connection?: Connection | ConnectionOptions | string,
) => ParameterDecorator;
