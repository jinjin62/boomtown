/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
const AuthMutationsFunction = require('./auth');
// -------------------------------
//const { UploadScaler, DateScalar } = require('../custom-types');

module.exports = app => {
  /*
  authMutations = {
    signup: ()=>{},
    login: ()=>{},
    logout: ()=>{},
  }

  */
  const authMutations = AuthMutationsFunction(app);
  return {
    // Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        console.log('CONTEXT:', context.token);
        if (context.token) {
          return context.token;
        }
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          const item = await pgResource.getItems(filter);
          return item;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }) {
        try {
          const userItems = await pgResource.getItemsForUser(id);
          return userItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          const borrowedItems = await pgResource.getBorrowedItemsForUser(id);
          return borrowedItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ ownerid }, args, { pgResource }) {
        try {
          const ownerItem = await pgResource.getUserById(ownerid);
          return ownerItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          const tags = await pgResource.getTagsForItem(id);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrowerid }, args, { pgResource }) {
        if (!borrowerid) {
          return null;
        }
        try {
          const borrower = await pgResource.getUserById(borrowerid);
          return borrower;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      ...authMutations,

      async addItem(parent, { item }, context, info) {
        console.log('ITEM: ', item);

        const user = context.token.id;
        try {
          const addItemTags = await context.pgResource.saveNewItem({
            item: item,
            user
          });
          return addItemTags;
        } catch (e) {
          throw new ApolloError(e);
        }

        // image = await image;
        // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        // const newItem = await context.pgResource.saveNewItem({
        //   item: args.item,
        //   image: args.image,
        //   user
        // });
        // return newItem;
      }
    }
  };
};
