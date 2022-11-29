const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументувати кожну функцію 

const listContacts = async () => {
    try {
        const dataString = await fs.readFile(contactsPath, 'utf8');
        const data = JSON.parse(dataString);
        return data;
    } catch (error) {
        console.log(error.message);
    }

}

const getContactById = async (contactId) => {
    try {
        const allContacts = await listContacts();
        const contact = allContacts.find(({ id }) => id === contactId);
        return contact ? contact : null;
    } catch (error) {
        console.log(error.message);
    }
}

const removeContact = async (contactId) => {
    try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(({ id }) => id === contactId);
        const deletedContact = allContacts[index];
        if (index !== -1) {
            allContacts.splice(index, 1);
            await fs.writeFile(contactsPath, JSON.stringify(allContacts));
        }
        return deletedContact ? deletedContact : null;
    } catch (error) {
        console.log(error.message);
    }
}

const addContact = async (name, email, phone) => {
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    }
    try {
        const allContacts = await listContacts();
        allContacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}