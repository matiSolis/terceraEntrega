export class GetContactDto{
    constructor(contactDB){
        this.nombreCompleto = contactDB.nombre + ' ' + contactDB.apellido;
        this.email = contactDB.email;
    };
}