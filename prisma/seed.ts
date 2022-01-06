import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tweets: any = [
  'Eu vou enfiar uva no céu da sua boca',
  'Quem ganhou tem que levar. Leva essa droga pra lá',
  'Porque sei que tudo isso passa. Você me abraça e a gente se ama',
  'Amor demais, lembro dos momentos que te amei demais'
];

async function main() { 
  for (const foo of tweets) {
    const createTweet = prisma.tweet.create({
      data: {
        content: foo,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
});