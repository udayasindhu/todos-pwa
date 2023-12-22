const TodoSchema = {
    title: 'Todo',
    description: 'Todo details table',
    version: 0,
    primaryKey: 'username',
    type: 'object',
    properties: {
        username: {
            type: 'string',
            primary: true,
            maxLength: 30
        },
        todos: {
            type: 'array',
            properties: {
                name: {
                    type: 'string',
                    maxLength: 50
                },
                status: {
                    type: 'string',
                    maxLength: 10
                }
            }
        } 
    }
};

module.exports = { TodoSchema };