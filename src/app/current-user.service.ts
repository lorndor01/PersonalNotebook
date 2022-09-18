import { Injectable } from '@angular/core';
import * as UserData from '../user-data.json';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }
  currentUser?:User;
  allUserData = UserData;
  users = this.allUserData.users;
  setCurrentUser(username: string, password: string): boolean{
    console.log("users" + this.users);
    for(var user of this.users){
      if(user.username==username){
        if(user.password==password){
          this.currentUser = user;
          return true;
        }
        else{
          return false;
        }
      }
    }
    this.currentUser = {"username":username,
                        "password":password,
                        "note": ""};
    this.users.push(this.currentUser);
    UserData.users.push(this.currentUser);
    return true;
  }
  
  getCurrentUser(): any{
    return this.currentUser;
  }
}
