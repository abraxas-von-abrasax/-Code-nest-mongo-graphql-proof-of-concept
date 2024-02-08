require('dotenv').config();

const host = process.env.MONGO_HOST ?? 'localhost';
const port = +process.env.MONGO_PORT || 27017;
const db = process.env.MONGO_DB ?? 'nestTestDB';
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

if (!username) {
    throw new Error('MONGO_USERNAME is required');
}

if (!password) {
    throw new Error('MONGO_PASSWORD is required');
}

const config = {
    mongodb: {
        url: `mongodb://${username}:${password}@${host}:${port}/${db}`,

        options: {
            // useNewUrlParser: true, // removes a deprecation warning when connecting
            // useUnifiedTopology: true, // removes a deprecating warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        },
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog',

    // The file extension to create migrations and search for in migration dir
    migrationFileExtension: '.js',

    // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
    // if the file should be run.  Requires that scripts are coded to be run multiple times.
    useFileHash: false,

    // Don't change this, unless you know what you're doing
    moduleSystem: 'commonjs',
};

module.exports = config;
