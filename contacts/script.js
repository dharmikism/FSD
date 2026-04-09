let contactList = JSON.parse(localStorage.getItem('contacts')) || [];

displayAllContacts();

function addContact() {
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('emailInput').value;

    if(!name || !phone || !email) {
        alert('Please enter all the data!');
        return;
    }

    const newConatct = {name, phone, email};

    contactList.push(newConatct);
    localStorage.setItem('contacts', JSON.stringify(contactList));
    displayAllContacts();

    console.log('All Contacts:', contactList);

    // Clear input fields
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('emailInput').value = '';
}

function displayAllContacts() {
    const allContactsContainer = document.getElementById('allContactsContainer');
    allContactsContainer.innerHTML = '';
    
    contactList.forEach((contact)=>{
        // Creating new div
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
        const profilePicContainer = document.createElement('div');
        profilePicContainer.classList.add('profile-pic-container');
        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info-container');
        const contactActions = document.createElement('div');
        contactActions.classList.add('contact-action-container');

        const img = document.createElement('img');
        img.src = 'https://pbs.twimg.com/profile_images/1665739202242199553/sOEd9Cb4.jpg';
        img.classList.add('profile-pic');
        img.alt = 'Profile Picture';
        profilePicContainer.appendChild(img);

        const nameElement = document.createElement('h3');
        nameElement.textContent = contact.name;
        const phoneElement = document.createElement('p');
        phoneElement.textContent = contact.phone;
        const emailElement = document.createElement('p');
        emailElement.textContent = contact.email;

        contactInfo.appendChild(nameElement);
        contactInfo.appendChild(phoneElement);
        contactInfo.appendChild(emailElement);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('editBtn')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteBtn')
        contactActions.appendChild(editButton);
        contactActions.appendChild(deleteButton);

        // Adding div to parent div
        contactCard.appendChild(profilePicContainer);
        contactCard.appendChild(contactInfo);
        contactCard.appendChild(contactActions);

        allContactsContainer.appendChild(contactCard);
    })
}