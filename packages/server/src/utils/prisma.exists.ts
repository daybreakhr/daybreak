/** A utility function which can be used to verify if we
 *  already have data in the database using filters
 *  @Param model: Any Prisma Model created using schema. Eg: this.prismaService.workspace
 *  @Param args: Argument for count method. Eg: { where: { slug } }
 */
export default async function exists<Model extends { count: any }>(
  model: Model,
  args: Parameters<Model['count']>[0],
) {
  const count = await model.count(args)
  return Boolean(count)
}
