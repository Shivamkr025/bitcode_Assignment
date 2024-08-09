
document.addEventListener("DOMContentLoaded", function () {
    const addContactBtn = document.getElementById("addContactBtn");
    const contactFormContainer = document.getElementById("contactFormContainer");
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const search = document.getElementById("search");
    const formTitle = document.getElementById("formTitle");

    let contacts = [];
    let isEditing = false;
    let editingIndex = null;

    addContactBtn.onclick = function () {
        formTitle.textContent = "Add Contact";
        contactFormContainer.classList.add("visible");
        contactForm.reset();
        isEditing = false;
    };

    contactForm.onsubmit = function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        const contact = { name, email, phone, address };

        if (isEditing) {
            contacts[editingIndex] = contact;
        } else {
            contacts.push(contact);
        }

        renderContacts();
        contactFormContainer.classList.remove("visible");
    };

    function renderContacts() {
        contactList.innerHTML = "";
        contacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${contact.name} - ${contact.email}</span>
                <div>
                    <button onclick="editContact(${index})">Edit</button>
                    <button onclick="deleteContact(${index})">Delete</button>
                    <button onclick="toggleContact(${index})">Hide</button>
                </div>
            `;
            contactList.appendChild(li);
        });
    }

    window.deleteContact = function (index) {
        contacts.splice(index, 1);
        renderContacts();
    };

    window.editContact = function (index) {
        const contact = contacts[index];
        document.getElementById("name").value = contact.name;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("address").value = contact.address;

        formTitle.textContent = "Edit Contact";
        contactFormContainer.classList.add("visible");
        isEditing = true;
        editingIndex = index;
    };

    window.toggleContact = function (index) {
        const li = contactList.children[index];
        li.classList.toggle("hidden");
    };

    search.oninput = function () {
        const query = search.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
        renderContacts(filteredContacts);
    };

    function renderContacts(filteredContacts = contacts) {
        contactList.innerHTML = "";
        filteredContacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${contact.name} - ${contact.email}</span>
                <div class='icon-btn'>
                  <button onclick="toggleContact(${index})"><i class="fa-solid fa-eye"></i></button>
                    <button onclick="editContact(${index})"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteContact(${index})"><i class="fa-solid fa-trash-can"></i></button>

                </div>
            `;
            contactList.appendChild(li);
        });
    }
});
