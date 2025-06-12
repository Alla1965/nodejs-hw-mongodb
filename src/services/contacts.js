import { Contact } from '../db/models/contactModel.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const filter = { userId };
  const contactsQuery = Contact.find();

  // const contactsCount = await Contact.find()
  //   .merge(contactsQuery)
  //   .countDocuments();

  const contactsCount = await Contact.countDocuments(filter);

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findById({ _id: contactId, userId });
};
export const createContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};
export const updateContactById = async (contactId, userId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedContact;
};
export const deleteContactById = async (contactId, userId) => {
  const result = await Contact.findByIdAndDelete({ _id: contactId, userId });
  return result;
};
