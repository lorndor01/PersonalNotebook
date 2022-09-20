import { Component, Input, Output, OnInit, Renderer2, EventEmitter} from '@angular/core';
import { iif } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2,
              private userService: UserService ) { 
  }
  ngOnInit(): void { 
  }
  @Input() loggedIn: boolean = false;
  nameInput: string = '';
  passwordInput: string = '';
  @Output() loggedInChange = new EventEmitter<boolean>();
  onSubmit(): void{
    this.nameInput.length==0 ? this.changeBorderColor(0, 'red') : this.changeBorderColor(0, 'black');
    this.passwordInput.length==0 ? this.changeBorderColor(1, 'red') : this.changeBorderColor(1, 'black');
    if(this.nameInput.length&&this.passwordInput.length){
      let userObject = this.userService.getUser(this.nameInput)
      if(userObject==null){
        //username isn't found
        this.changeBorderColor(0, 'red');
        return;
      }
      if(userObject.password != this.passwordInput){
        //user exists but wrong password
        this.changeBorderColor(1, 'red');
        return;
      }
      //everything good to good.
      this.loggedInChange.emit(true);
    }
  }
  changeBorderColor(childIndex:number, colorValue:string){
    const parent = document.getElementById('loginBox');
    const input = parent?.children[childIndex];
    this.renderer.setStyle(input, 'border-color', colorValue);
  }
}


