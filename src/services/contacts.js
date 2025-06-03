import { Contact } from '../models/contactModel.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
export const createContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};
export const updateContactById = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedContact;
};
export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};
