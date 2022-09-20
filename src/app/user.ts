export class User{
    username? : string;
    password? : string;
    note? : string;
    constructor(username: string, password: string, note: string){
        this.username = username;
        this.password = password;
        this.note = note;
    }
}