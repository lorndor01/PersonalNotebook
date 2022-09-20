import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/compat/database';
import { __values } from 'tslib';
import { keepUnstableUntilFirst } from '@angular/fire';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserObject: User | null = null;
  private dbPath = '/users';
  private keys: any = [];
  usersRef: AngularFireList<User>;
  constructor(private db: AngularFireDatabase){
    this.usersRef = db.list(this.dbPath);
    this.usersRef.query.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.keys.push(childSnapshot.key?.toString());
      });
    });
  }

  getUser(username: string): User | null{
    let userObject: User | null = null;
    this.keys.forEach((key: any) => {
      this.usersRef.query.on("value", (snapshot) => {
        if(username === snapshot.child(key).exportVal()?.username){
          userObject = snapshot.child(key).exportVal();
        }
      })
    });
    this.currentUserObject = userObject;
    return userObject;
  }
  updateUser(key: string, username: string, password:string, newNote: string): Promise<void> | null{
    return this.usersRef.update(key, new User(username, password, newNote));
  }
  createUser(username: string, password: string){
    this.usersRef.push(new User(username, password, ""));
  }
}
