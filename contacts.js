const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contact = await parsedContacts.find(
      ({ id }) => id === contactId.toString()
    );
    console.log(contact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const index = await parsedContacts.findIndex(
      ({ id }) => id === contactId.toString()
    );
    await parsedContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
    console.log(await fs.readFile(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = {
      name,
      email,
      phone,
    };
    parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
