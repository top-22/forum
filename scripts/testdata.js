const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const data = require("./testdata.json");

async function main() {
  // delete old data
  console.log("deleting users...");
  await prisma.roomUser.deleteMany();
  await prisma.user.deleteMany();
  console.log("deleting threads...");
  await prisma.thread.deleteMany();
  console.log("deleting tags...");
  await prisma.tag.deleteMany();
  console.log("deleting rooms...");
  await prisma.roomAffiliation.deleteMany();
  await prisma.room.deleteMany();
  console.log("deleting affiliations...");
  await prisma.affiliation.deleteMany();

  console.log("===========");

  console.log("CREATING AFFILIATIONS");
  for (const affiliationData of data.affiliations) {
    console.log("   " + affiliationData.name);
    await prisma.affiliation.create({
      data: {
        name: affiliationData.name,
        description: affiliationData.description,
      },
    });
  }

  console.log("CREATING ROOMS");
  for (const roomData of data.rooms) {
    console.log("   " + roomData.name);
    const roomAffiliations = [];
    for (const affiliation of roomData.affiliations.optional) {
      const affiliationId = (
        await prisma.affiliation.findFirstOrThrow({
          where: { name: affiliation },
        })
      ).id;
      roomAffiliations.push({
        type: "OPTIONAL",
        affiliation: { connect: { id: affiliationId } },
      });
    }
    for (const affiliation of roomData.affiliations.required) {
      const affiliationId = (
        await prisma.affiliation.findFirstOrThrow({
          where: { name: affiliation },
        })
      ).id;
      roomAffiliations.push({
        type: "REQUIRED",
        affiliation: { connect: { id: affiliationId } },
      });
    }
    await prisma.room.create({
      data: {
        name: roomData.name,
        description: roomData.description,
        affiliations: {
          create: roomAffiliations,
        },
      },
    });
  }

  console.log("CREATING THREADS");
  for (const threadData of data.threads) {
    console.log("   " + threadData.name);
    await prisma.thread.create({
      data: {
        name: threadData.name,
        room: {
          connect: {
            id: (
              await prisma.room.findFirstOrThrow({
                where: { name: threadData.room },
              })
            ).id,
          },
        },
        tags: {
          connectOrCreate: threadData.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  console.log("CREATING USERS");
  for (const userData of data.users) {
    console.log("   " + userData.name);
    const roomUsers = [];
    for (const room of userData.rooms) {
      const roomId = (
        await prisma.room.findFirstOrThrow({ where: { name: room.name } })
      ).id;
      roomUsers.push({ role: room.role, room: { connect: { id: roomId } } });
    }
    await prisma.user.create({
      data: {
        name: userData.name,
        affiliations: {
          create: userData.affiliations.map((affiliation) => ({
            name: affiliation,
          })),
        },
        rooms: {
          create: roomUsers,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
