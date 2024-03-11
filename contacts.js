const fs = require("fs").promises;
const path = require("path");

const { dir, base } = path.parse("./db/contacts");

function listContacts() {
  fs.readFile(dir + "/" + base + ".json").then((buffer) => {
    const contactsFile = JSON.parse(buffer)
    console.table([...contactsFile]);
  });
}

function removeContact(id) {
  fs.readFile(dir + "/" + base + ".json").then((buffer) => {
    let contacts = JSON.parse(buffer.toString());
    contacts = contacts.filter((c) => c.id !== id);
    fs.writeFile(dir + "/" + base + ".json", JSON.stringify(contacts)).then(() => {
      console.log("Deleted");
    });
  });
}

function getContactById(contactId) {
  fs.readFile(dir + "/" + base + ".json").then((buffer) => {
    const contacts = JSON.parse(buffer.toString());
    user = contacts.filter((user) => user.id === contactId);
    console.log(user.length === 0 ? "not found" : user)
  });
}

function addContact(name, email, phone) {
  fs.readFile(dir + "/" + base + ".json").then((buffer)=>{
    const contacts = JSON.parse(buffer.toString())
    const newContact = {name, email, phone}
    contacts.push(newContact)
    fs.writeFile(dir + "/" + base + ".json", JSON.stringify(contacts)).then(() => {
      console.log("Contacto creado:")
      console.table(newContact)
    })
  })
}

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact
}


