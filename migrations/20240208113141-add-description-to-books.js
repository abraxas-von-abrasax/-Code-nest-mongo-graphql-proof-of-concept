module.exports = {
    async up(db) {
        await db.collection('books').updateMany({}, { $set: { description: '' } });
    },

    async down(db) {
        await db.collection('books').updateMany({}, { $unset: { description: '' } });
    },
};
