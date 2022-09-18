import { Component, Input, Output, OnInit, Renderer2, EventEmitter} from '@angular/core';
import { CurrentUserService } from '../current-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2,
              private userService: CurrentUserService ) { 
  }
  ngOnInit(): void { 
  }
  @Input() loggedIn: boolean = false;
  nameInput: string = '';
  passwordInput: string = '';
  @Output() loggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  onSubmit(): void{
    this.nameInput.length==0 ? this.changeBorderColor(0, 'red') : this.changeBorderColor(0, 'black');
    this.passwordInput.length==0 ? this.changeBorderColor(1, 'red') : this.changeBorderColor(1, 'black');
    if(this.nameInput.length&&this.passwordInput.length){
      if(this.userService.setCurrentUser(this.nameInput, this.passwordInput)){
        this.loggedInChange.emit(true);
      }
      else{
        this.changeBorderColor(1, 'red');
      }
    }

  }
  changeBorderColor(childIndex:number, colorValue:string){
    const parent = document.getElementById('loginBox');
    const input = parent?.children[childIndex];
    this.renderer.setStyle(input, 'border-color', colorValue);
  }
}


