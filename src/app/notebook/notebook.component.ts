import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  constructor(private userService : UserService) { }
  private currentUser = this.userService.currentUserObject;
  username = this.currentUser?.username;
  note = this.currentUser?.note;
  ngOnInit(): void {
  }

}
