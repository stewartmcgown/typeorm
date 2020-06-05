"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmProviders = void 0;
const typeorm_utils_1 = require("./common/typeorm.utils");
function createTypeOrmProviders(entities, connection) {
    return (entities || []).map((entity) => ({
        provide: typeorm_utils_1.getRepositoryToken(entity, connection),
        useFactory: (connection) => {
            return connection.options.type === 'mongodb'
                ? connection.getMongoRepository(entity)
                : connection.getRepository(entity);
        },
        inject: [typeorm_utils_1.getConnectionToken(connection)],
    }));
}
exports.createTypeOrmProviders = createTypeOrmProviders;
