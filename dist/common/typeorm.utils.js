"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.getConnectionName = exports.handleRetry = exports.getEntityManagerToken = exports.getConnectionPrefix = exports.getConnectionToken = exports.getCustomRepositoryToken = exports.getRepositoryToken = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const typeorm_1 = require("typeorm");
const util_1 = require("util");
const uuid_1 = require("uuid");
const circular_dependency_exception_1 = require("../exceptions/circular-dependency.exception");
const typeorm_constants_1 = require("../typeorm.constants");
const logger = new common_1.Logger('TypeOrmModule');
function getRepositoryToken(entity, connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    if (util_1.isNullOrUndefined(entity)) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectRepository()');
    }
    const connectionPrefix = getConnectionPrefix(connection);
    const name = 'options' in entity ? entity.options.name : entity.name;
    return `${connectionPrefix}${name}Repository`;
}
exports.getRepositoryToken = getRepositoryToken;
function getCustomRepositoryToken(repository) {
    if (util_1.isNullOrUndefined(repository)) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectRepository()');
    }
    return typeof repository.target === 'function' ? repository.target.name : repository.target;
}
exports.getCustomRepositoryToken = getCustomRepositoryToken;
function getConnectionToken(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    return typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection
        ? typeorm_1.Connection
        : 'string' === typeof connection
            ? `${connection}Connection`
            : typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection.name || !connection.name
                ? typeorm_1.Connection
                : `${connection.name}Connection`;
}
exports.getConnectionToken = getConnectionToken;
function getConnectionPrefix(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    if (connection === typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
        return '';
    }
    if (typeof connection === 'string') {
        return connection + '_';
    }
    if (connection.name === typeorm_constants_1.DEFAULT_CONNECTION_NAME || !connection.name) {
        return '';
    }
    return connection.name + '_';
}
exports.getConnectionPrefix = getConnectionPrefix;
function getEntityManagerToken(connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
    return typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection
        ? 'EntityManager'
        : 'string' === typeof connection
            ? `${connection}EntityManager`
            : typeorm_constants_1.DEFAULT_CONNECTION_NAME === connection.name || !connection.name
                ? 'EntityManager'
                : `${connection.name}EntityManager`;
}
exports.getEntityManagerToken = getEntityManagerToken;
function handleRetry(retryAttempts = 9, retryDelay = 3000, connectionName = typeorm_constants_1.DEFAULT_CONNECTION_NAME, verboseRetryLog = false, toRetry) {
    return (source) => source.pipe(operators_1.retryWhen((e) => e.pipe(operators_1.scan((errorCount, error) => {
        if (toRetry && !toRetry(error)) {
            throw error;
        }
        const connectionInfo = connectionName === typeorm_constants_1.DEFAULT_CONNECTION_NAME
            ? ''
            : ` (${connectionName})`;
        const verboseMessage = verboseRetryLog
            ? ` Message: ${error.message}.`
            : '';
        logger.error(`Unable to connect to the database${connectionInfo}.${verboseMessage} Retrying (${errorCount + 1})...`, error.stack);
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), operators_1.delay(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionName(options) {
    return options && options.name ? options.name : typeorm_constants_1.DEFAULT_CONNECTION_NAME;
}
exports.getConnectionName = getConnectionName;
exports.generateString = () => uuid_1.v4();
