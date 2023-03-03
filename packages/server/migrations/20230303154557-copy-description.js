module.exports = {
  async up(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { cDescription: '$description' } }])
  },

  async down(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { cDescription: undefined } }])
  },
}
