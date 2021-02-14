const models  = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/*const protect = async (context) => {
  
};*/

module.exports = {
    Query: {
      users: async (_, __,{user}) => {
      try{
        if(!user){
          throw new AuthenticationError('UNAUTHENTICATED');
        }else {
          models.User.findByPk(user.id).then((user) => console.log(user)).catch((err) => {throw new AuthenticationError('UNAUTHENTICATED');});
        }
        console.log('userAuth',user);
        const users = await models.User.findAll();
        
        return users;

      }catch(error){
        throw error
      }

    },
      login: async (_,args) => {
        const {username, password} = args;
        let errors = {};
        try{
          if(username.trim() === '') {errors.username = 'Please provide a username';}
          if(password === '') errors.password = 'Please provide a password';

          if(Object.keys(errors).length > 0){
            throw new AuthenticationError('Username or Password Empty',{errors});
          }

          const user = await models.User.findOne({ where: {username: username} });
          if(!user){
            errors.username = 'user not found';
            throw new AuthenticationError('User not found',{errors}); 
          }

          const correctPassword = await bcrypt.compare(password,user.password);
          if(!correctPassword){
            errors.password = 'password is incorrect';
            throw new AuthenticationError('Password is incorrect',{errors}); 
          }

          const token = signToken(user.id);
          user.token = token;
          return user;
        }catch(error){
          console.log(error);
          throw error
        }
      },
    },
    Mutation: {
      register: async (_, args) => {
        let { username, email, password, confirmPassword } = args;
        let errors = {};
        try{
          if(username.trim() === '') {errors.username = 'Please provide a username';}
          if(email.trim() === '') {errors.email = 'Please provide a email';}
          if(password.trim() === '') errors.password = 'Please provide a password';
          if(confirmPassword.trim() === '') errors.confirmPassword = 'Please provide a confirmPassword';
          if(password !== confirmPassword) errors.matching = 'Password not match ConfirmPassword'
          
          /*const userByUsername = await models.User.findOne({ where: {username} });
          if(userByUsername) errors.username = 'username is taken';

          const userByEmail = await models.User.findOne({ where: {email} });
          if(userByEmail) errors.email = 'email is taken';*/

          
          if(Object.keys(errors).length > 0){
            throw errors;
          }

          const id = uuidv4();
          password = await bcrypt.hash(password, 12);
          const user = await models.User.create({
            id, username, email, password
          })
          return user;
        }catch(err){
          if(err.name === 'SequelizeUniqueConstraintError') {
            err.errors.forEach((e) => (errors[e.path] = `${e.path} is already taken.`));
          }
          if(err.name === 'SequelizeValidationError') {
            err.errors.forEach((e) => (errors[e.path] = e.message));
          }
          throw new UserInputError('Bad input',{errors});
        }
    },

    },
}