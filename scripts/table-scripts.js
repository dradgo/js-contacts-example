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

function showExtractContact(personId) {
    let person = getPerson(personId);
    $('#rest-contacts-' + personId).removeAttr('hidden');
    const $extractContactButton = $('#extra-contact-' + personId);
    $extractContactButton.prop('hidden', 'hidden');
    $extractContactButton.attr('hidden', 'hidden');
    return true;
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
        const restContacts = person.contacts.length - contactLimit;
        if(restContacts === 1) {
            contactItems.push(convertContactToHtml(person.contacts[contactLimit]));
        } else {
            let restContactItems = [];
            restContactItems.push(`<span id="rest-contacts-${person.id}" hidden="hidden">`);
            let title = "";
            for (let index = contactLimit; index < person.contacts.length; index++) {
                let contact = person.contacts[index];
                const itemHtml = convertContactToHtml(contact);
                restContactItems.push(itemHtml);
                title += `**${contact.type}**: ${contact.value} \n`;
            }
            const itemHtml = `<span id="extra-contact-${person.id}" class="fa fa-plus" onclick="showExtractContact(${person.id})">${restContacts}</span>`;
            contactItems.push(itemHtml);
            restContactItems.push(`</span>`);
            restContactItems.forEach(c => contactItems.push(c));
        }

    }
    return contactItems.join(' ');
}