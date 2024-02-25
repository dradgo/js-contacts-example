store = {
    persons: [
        {
            id: 1,
            firstName: 'First1',
            middleName: 'Middle1',
            lastName: 'Last1',
            createDate: new Date(),
            updateDate: new Date(),
            contacts: [{
                uuid: generateUUID(),
                type: 'vk',
                label: 'Email',
                value: 'test@example.com'
            },
                {
                    uuid: generateUUID(),
                    type: 'facebook',
                    label: 'Телефон',
                    value: '+123456789'
                }]
        },

    ],
    contactTypes: [
        {
            code: 'VK',
            name: 'VK',
            glyph: '[VK]'
        },
    ]
};

function getPersons() {
    return store.persons;
}

function addPerson(person) {
    person.id = getNextId();
    person.createDate = new Date();
    person.updateDate = new Date();
    store.persons.push(person);
    return person;
}

function removePerson(id) {
    store.persons = store.persons.filter(function (person) {
        return person.id !== id;
    });
}

function getPerson(id) {
    let person = store.persons.find(function (person) {
        return person.id === id;
    });
    return person;
}

function getContactTypes() {
    return store.contactTypes;
}

function getNextId() {
    if (store.persons.length === 0)
        return 1;
    else
        var maxId = Math.max.apply(null, store.persons.map(function (o) {
            return o.id;
        }))
    return maxId + 1;
}

function dateFormatter(value, row, index) {
    return moment(value).format('DD.MM.YYYY HH:mm')
}
function validateForm() {
    let valid = true;
    if(!$('#firstNameInput').val()) {
        valid = false;
    }
    if(!$('#lastNameInput').val()) {
        valid = false;
    }
    $('.contact-value').each(function (index) {
        console.log('control', index);
        if(!$(this).val()) {
            valid = false;
        }
    });
    console.log("valid", valid);
    if(!valid) {
        $('#savePersonButton').prop('disabled', true);
    } else {
        $('#savePersonButton').prop('disabled', false);
    }
    return valid;
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

