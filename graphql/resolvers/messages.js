const models  = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { Op } = require('sequelize');

module.exports = {
    Query: {
    getMessages: async (_,{ from },{ user }) => {
        try{
            if(!user){
                throw new AuthenticationError('UNAUTHENTICATED');
            }
    
            const userInfo = await models.User.findByPk(user.id);
    
            if(!userInfo){
                throw new AuthenticationError('UNAUTHENTICATED');
            }

            const otherUser = await models.User.findOne({ where:{ username: from } });
            
            if(!otherUser){
                throw new UserInputError('User friend not found');
            }

            const usernames = [userInfo.username,otherUser.username];

            const messages = await models.Message.findAll({ where: { 
                from: {[Op.in]: usernames},
                to: {[Op.in]: usernames}
             }, order:[['createdAt','ASC']] });

            return messages;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    },
    Mutation: {
    sendMessage: async (_, args, {user}) => {
        try{
          
        if(!user){
            throw new AuthenticationError('UNAUTHENTICATED');
        }

         
        const from = await models.User.findByPk(user.id);

        if(!from){
            throw new AuthenticationError('UNAUTHENTICATED');
        }

        const recipient = await models.User.findOne({ where: {username: args.to} });


        if(!recipient){
            throw new UserInputError('User recipient not found');
          } else if (recipient.username === from.username) {
            
            throw new UserInputError('you cant message your-self');
          }

        if(args.content.trim() === ''){
            throw new UserInputError('Content o message is empty');
          }
        
        const id = uuidv4();
          

        const message = await models.Message.create({id, content: args.content, from: from.username, to:args.to});

          return message;

        }catch(err){
          console.log(err);
          throw err
        }
      },
    },
}