module.exports = {
  async up(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { description: '$newDescription' } }])
  },

  async down(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { description: '$cDescription' } }])
  },
}
