import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/User';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit{
@Output() onSubmit = new EventEmitter<User>()

userForm!: FormGroup

constructor(){}

ngOnInit(): void {
  this.userForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    nome: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
}

get id(){
  return this.userForm.get('id')!;
}

get nome(){
  return this.userForm.get('nome')!;
}

get email(){
  return this.userForm.get('email')!;
}

get password(){
  return this.userForm.get('password')!;
}



submit(){
  if(this.userForm.invalid){
    return;
  }

  this.onSubmit.emit(this.userForm.value);
}
}
