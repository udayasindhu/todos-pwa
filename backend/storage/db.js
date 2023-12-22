const { createRxDatabase } = require('rxdb');
const { getRxStorageMemory } = require('rxdb/plugins/storage-memory');
const { addRxPlugin } = require('rxdb');
const { RxDBDevModePlugin } = require('rxdb/plugins/dev-mode');

const { TodoSchema } = require('./schemas/todo');

const Database = {};

const create = async () => {
    addRxPlugin(RxDBDevModePlugin);
    const database = await createRxDatabase({
        name: 'todo-base',
        storage: getRxStorageMemory(),
        multiInstance: true
    });
    await database.addCollections({
        todos: {
            schema: TodoSchema
        }
    });
    return database;
};

let createPromise = null;
Database.get = async () => {
    if (!createPromise) {
        createPromise = create();
    }
    return createPromise;
};


module.exports = Database;

