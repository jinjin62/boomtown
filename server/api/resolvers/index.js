const { ApolloError } = require('apollo-server-express');

const AuthMutationsFunction = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  /*
  authMutations = {
    signup: ()=>{},
    login: ()=>{},
    logout: ()=>{},
  }

  Upload: UploadScalar,
  Date: DateScalar,
  */
  const authMutations = AuthMutationsFunction(app);
  return {
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
      }
    }
  };
};
