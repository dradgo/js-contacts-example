const baseUrl ='http://localhost:3000'

async function fetchPersons(query) {
    if(query) {
        console.log("query", query);
        const response = await fetch( baseUrl +'/api/clients?'+ new URLSearchParams({
            search: query
        }));
        if(response.ok) {
            const json = await response.json();
            const persons = json.map(function (dto) {
                return fromPersonDto(dto);
            });
            store.persons = persons;
            return persons;
        } else {
            throw new Error("Error while executing HTTP request: " + response.status);
        }
    } else {
        const response = await fetch( baseUrl +'/api/clients');
        if(response.ok) {
            const json = await response.json();

            const persons = json.map(function (dto) {
                return fromPersonDto(dto);
            });
            store.persons = persons;
            return persons;
        } else {
            throw new Error("Error while executing HTTP request: " + response.status);
        }

    }
}

async function fetchPerson(id) {
    const response = await fetch( baseUrl +'/api/clients/'+ id);
    if(response.ok) {
        const json = await response.json();
        return fromPersonDto(json);
    } else {
        throw new Error("Error while executing HTTP request: " + response.status);
    }
}
function fromPersonDto(personDto) {
    let contacts = [];
    personDto.contacts.forEach(function (contact) {
        contacts.push({
            type: contact.type,
            value: contact.value
        })
    });
    const fullName = [
        personDto.name,
        personDto.lastName,
        personDto.surname
    ].join(' ');
    return {
        id: personDto.id,
        firstName: personDto.name,
        lastName: personDto.surname,
        middleName: personDto.lastName,
        fullName: fullName,
        createDate: personDto.createdAt,
        updateDate: personDto.updatedAt,
        contacts: contacts
    };
}

function toPersonDto(person) {
    let contacts = [];
    person.contacts.forEach(function (contact) {
        contacts.push({
            type: contact.type,
            value: contact.value
        })
    });
    return {
        name: person.firstName,
        surname: person.lastName,
        lastName: person.middleName,
        contacts: contacts
    };
}

async function createPerson(person){
    let personDto = toPersonDto(person);

    const response = await fetch( baseUrl +'/api/clients/',  {
        method: 'POST',
        body: JSON.stringify(personDto), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        return await response.json();
    } else {
        throw new Error("Error while executing HTTP request: " + await response.text());
    }

}

async function updatePerson(id, person){
    let personDto = toPersonDto(person);
    const response = await fetch( baseUrl +'/api/clients/'+ id, {
        method: 'PATCH',
        body: JSON.stringify(personDto), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        return await response.json();
    } else {
        throw new Error("Error while executing HTTP request: " + await response.text());
    }

}

async function deletePerson(id) {
    const response = await fetch( baseUrl +'/api/clients/'+ id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        return await response.text();
    } else {
        throw new Error("Error while executing HTTP request: " + response.status);
    }
}