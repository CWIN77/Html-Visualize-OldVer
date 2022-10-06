// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { HvData, ShareComp, User } = initSchema(schema);

export {
  HvData,
  ShareComp,
  User
};