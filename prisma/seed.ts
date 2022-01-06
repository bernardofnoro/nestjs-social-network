import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const categorias: any = [
  'Axé',
  'Samba',
  'Pagode',
  'Forró'
]

for (const cat of categorias) {
  const createCategory = prisma.category.create({
    data: {
      name: cat,
     },
  })
}

const tweets: any = [
  'Eu vou enfiar uva no céu da sua boca',
  'Quem ganhou tem que levar. Leva essa droga pra lá',
  'Porque sei que tudo isso passa. Você me abraça e a gente se ama',
  'Amor demais, lembro dos momentos que te amei demais'
]

for (const tweet of tweets) {
  const createTweet = prisma.tweet.create({
    data: {
      content: tweet,
     },
  })
}