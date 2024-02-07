import { join } from 'path';

export default () => ({
    mongodb: {
        uri: process.env.MONGO_URI,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
    },
    graphql: {
        playground: process.env.DISABLE_PLAYGROUND !== 'true',
        autoSchemaFile: parseAutoSchemaFile(),
        sortSchema: process.env.DISABLE_SCHEMA_SORTING !== 'true',
    },
});

function parseAutoSchemaFile() {
    const envVal = process.env.AUTO_SCHEMA_FILE;

    if (envVal === undefined) {
        return join(process.cwd(), 'src', 'schema.gql');
    }

    if (envVal === 'true' || envVal === 'false') {
        return envVal === 'true';
    }

    return join(process.cwd(), envVal);
}
