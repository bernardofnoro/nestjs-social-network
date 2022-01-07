import { Prisma, PrismaClient } from '@prisma/client'
import { create } from 'domain';

const prisma = new PrismaClient()
// SEED SEM MANY TO MANY.



//CRIAÇÃO USUARIO + TWEET + FOLLOWER + FOLLOWING
  const userData: Prisma.UserCreateInput[] = [
    {
      name: 'Bernardo',
      lastname: 'Freitas',
      username: 'freitasbe3',
      password: '12345',
      about:'la garantia soy yo',
      birthday: '1987 safra boa',
      tweet: {
       create: [
         {
           content: 'Esse é meu primeiro tweet !',
         }
       ]
      }, 
      follower: {
        create: [
          {
            name: 'FOLLOWER DO BERNARDO',
          }
        ]
       },
       following: {
        create: [
          {
            name: 'FOLLOWING FULANO',
          }
        ]
       }  
    },
    {
      name: 'Chanely',
      lastname: 'Marques',
      username: 'chanelym3',
      password: '54321',
      about:'LEONA DESCE DAÍ!',
      birthday: '1991?',
      tweet: {
       create: [
         {
           content: 'Oi! Eu sou a Cha!',
         }
       ]
      }, 
      follower: {
        create: [
          {
            name: 'SEGUIDOR DA CHA',
          }
        ]
       },
       following: {
        create: [
          {
            name: 'SEGUINDO FULANO',
          }
        ]
       }  
    },
    {
      name: 'Maria',
      lastname: 'Eduarda',
      username: 'dudinha3',
      password: 'chocotone',
      about:'Hello world!',
      birthday: '1992?',
      tweet: {
       create: [
         {
           content: 'OI GALERINHA!',
         }
       ]
      }, 
      follower: {
        create: [
          {
            name: 'SEGUIDOR DA DUDA',
          }
        ]
       },
       following: {
        create: [
          {
            name: 'SEGUINDO FULANO',
          }
        ]
       }  
    },
    {
      name: 'Leonardo',
      lastname: 'Prof hacker',
      username: 'leohackerman3',
      password: 'xpto',
      about:'tá tranquilo então',
      birthday: '1994?',
      tweet: {
       create: [
         {
           content: 'Tudo tranquilo galera? fala no chat',
         }
       ]
      }, 
      follower: {
        create: [
          {
            name: 'SEGUIDOR DO LEO',
          }
        ]
       },
       following: {
        create: [
          {
            name: 'SEGUINDO FULANO',
          }
        ]
       }  
    }
  ]
 
async function main() {
  console.log('start seeding...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`created user ${user.name} sucessfully.`)
  }// CRIAÇÃO DE SEED PARA CATEGORIAS
  const categories : any = ['Musica', 'Humor', 'Tecnologia', 'Curiosidades', 'Adele fans']
  for (const foo of categories) {
    await prisma.category.createMany({
      data: {
        name: foo,
      },
    })
    console.log(`created category ${foo} sucessfully.`);
  }
  console.log(`Seeding Complete! `)
}



main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
});