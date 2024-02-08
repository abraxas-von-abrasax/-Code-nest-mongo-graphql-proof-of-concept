module.exports = {
    async up(db) {
        await db.collection('books').updateMany(
            {
                $or: [{ description: { $eq: '' } }, { description: { $exists: false } }],
            },
            { $set: { description: '<<no description>>' } }
        );
    },

    async down(db) {
        await db.collection('books').updateMany({ description: '<<no description>>' }, { $unset: { description: '' } });
    },
};
