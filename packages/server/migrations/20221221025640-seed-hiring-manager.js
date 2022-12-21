module.exports = {
  async up(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { hiringManager: '$createdBy' } }])
  },

  async down(db) {
    await db
      .collection('Job')
      .updateMany({}, [{ $set: { hiringManager: undefined } }])
  },
}
