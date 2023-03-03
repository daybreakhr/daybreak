module.exports = {
  async up(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $unset: ['newDescription', 'cDescription'] }])
  },

  async down(db) {
    await db.collection('Job').updateMany({}, [
      {
        $set: {
          newDescription: '$description',
          cDescription: '$description',
        },
      },
    ])
  },
}
