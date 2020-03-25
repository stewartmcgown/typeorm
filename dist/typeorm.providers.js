"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_utils_1 = require("./common/typeorm.utils");
function createTypeOrmProviders(entities, connection) {
    return (entities || []).map(entity => ({
        provide: typeorm_utils_1.getRepositoryToken(entity, connection),
        useFactory: (connection) => {
            if (typeof typeorm_1.Repository === 'object' && (entity.prototype instanceof typeorm_1.Repository ||
                entity.prototype instanceof typeorm_1.AbstractRepository)) {
                return connection.getCustomRepository(entity);
            }
            return connection.options.type === 'mongodb'
                ? connection.getMongoRepository(entity)
                : connection.getRepository(entity);
        },
        inject: [typeorm_utils_1.getConnectionToken(connection)],
    }));
}
exports.createTypeOrmProviders = createTypeOrmProviders;
