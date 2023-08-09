import prisma from '../DB/prisma';



const inviteRepository = {
     sendInvite: async (email: string, agentId: number) => {
         
          const result = await prisma.invitation.create({
               data: {
                    email: email,
                    agentId: agentId
               }
          })

          return result
     },


     getAllInvites: async () => {
        const result = await prisma.invitation.findMany()

        return result;
     },
     deleteInvite: async (inviteId: number) => {
          const result = await prisma.invitation.delete({
              where: {
                  id: inviteId
              }
          });
  
          return result;
       }
}



export default inviteRepository;