import { Component } from '@angular/core';
import { User } from './User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private userService: UserService){}

  async createHandler(user: User){
    const formData = new FormData()

    formData.append('id', user.id)
    formData.append('nome',user.nome)
    formData.append('email', user.email)
    formData.append('password', user.password)

    await this.userService.createUser(formData).subscribe();

  }
}
