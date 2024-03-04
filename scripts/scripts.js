store = {
    persons: [
    ]
};






function getPersons(query) {
    return fetchPersons(query);
}

function addPerson(person) {
    return createPerson(person).then(function (person) {
        console.log('Person created', person);
    });
}

function removePerson(id) {
    store.persons = store.persons.filter(function (person) {
        return person.id !== id;
    });
}

function getPerson(id) {
    return store.persons.find(function (person) {
        return person.id == id;
    });
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

