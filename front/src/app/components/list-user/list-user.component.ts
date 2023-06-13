import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  dados: any;

  constructor(private apiService: ApiService){ }

  ngOnInit(): void {
    this.apiService.getDados().subscribe(
      (response) => {
        this.dados = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
