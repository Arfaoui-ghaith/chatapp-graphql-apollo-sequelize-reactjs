const models  = require('../models/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
      users: async () => {
        try{
        const users = await models.User.findAll();
        
        return users;
      }catch(error){
          console.log('Something went wrong on fetching users',error);
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
    }
}