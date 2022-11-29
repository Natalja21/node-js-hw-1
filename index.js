const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts.js");

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers');
const arr = hideBin(process.argv);
const { argv } = yargs(arr);

// // TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const data = await listContacts();
            console.table(data)
            break;

        case "get":

            const idContact = await getContactById(id.toString());
            console.log(idContact)
            break;

        case "add":
            await addContact(name, email, phone);
            break;

        case "remove":
            const deletedContact = await removeContact(id.toString());
            console.log(deletedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);