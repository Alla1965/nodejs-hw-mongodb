import { Contact } from '../models/contactModel.js';

export const getAllContacts = async () => Contact.find();

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
