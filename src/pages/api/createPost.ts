import { PrismaClient } from "@prisma/client";

export default async function handler(req: any, res: any) {
  let prisma = new PrismaClient();

  // Get data submitted in request's body.
  const body = req.body;
  const room = body.room;
  const title = body.title;
  const description = body.description;
  //const tags = body.tags
  //const commentsOff = body.commentsOff

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  // console.log('body: ', body)
  // console.log(room, title, description, tags, commentsOff)

  const result = await prisma.thread.create({
    data: {
      name: title,
      description: description,
      room: { connect: { id: parseInt(room) } },
    },
  });

  // Found the name.
  // Sends a HTTP success code
  res.json(result);
  //res.status(200).json({ data: `${body.room} ${body.title}` })
}

//let tagsArray: [string] = tags.split(" ")
//tagsArray.forEach(tag => {
//  if (tag[0] != '#'){
//    const index = tagsArray.indexOf(tag);
//    tagsArray.splice(index, 1)
//  }
//});

//daten nehmen aus request, validieren, in db pushen -> bekommt thread id zurueck, redirect mit router zu dem thread selbst
