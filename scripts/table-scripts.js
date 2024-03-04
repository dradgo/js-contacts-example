function dateFormatter(value, row, index) {
    return value;
}

function nameFormatter(value, row, index) {
    return [
        row.firstName,
        row.middleName,
        row.lastName
    ].join(' ')
}

function contactFormatter(value, row, index) {
    let person = getPerson(row.id);
    let contactItems = [];
    const contactLimit = 5;
    let firstLimit = contactLimit > person.contacts.length ? person.contacts.length : contactLimit;
    for (let index = 0; index < firstLimit; index++) {
        let contact = person.contacts[index];
        const itemHtml = convertContactToHtml(contact);
        contactItems.push(itemHtml);
    }
    if(person.contacts.length > contactLimit) {
        let restContacts = person.contacts.length - contactLimit;
        if(restContacts === 1) {
            contactItems.push(convertContactToHtml(person.contacts[contactLimit]));
        } else {
            let title = "";
            for (let index = contactLimit; index < person.contacts.length; index++) {
                let contact = person.contacts[index];
                title += `**${contact.type}**: ${contact.value} \n`;
            }
            const itemHtml = `<span class="fa fa-plus" title="${title}">${restContacts}</span>`;
            contactItems.push(itemHtml);
        }

    }
    return contactItems.join(' ');
}