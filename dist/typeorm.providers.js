"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_utils_1 = require("./common/typeorm.utils");
function createTypeOrmProviders(entities, connection) {
    const getRepository = (connection, entity) => {
        return connection.options.type === 'mongodb'
            ? connection.getMongoRepository(entity)
            : connection.getRepository(entity);
    };
    const getCustomRepository = (connection, entity) => connection.getCustomRepository(entity);
    const repositories = (entities || []).map(entity => ({
        provide: typeorm_utils_1.getRepositoryToken(entity, connection),
        useFactory: (connection) => {
            return getRepository(connection, entity);
        },
        inject: [typeorm_utils_1.getConnectionToken(connection)],
    }));
    return [...repositories];
}
exports.createTypeOrmProviders = createTypeOrmProviders;
