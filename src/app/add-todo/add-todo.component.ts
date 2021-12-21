import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../app.service';
import { TodoQuery } from '../state/query';
import { TodoStore } from '../state/store';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  form:FormGroup | undefined;
  isLoading=false;
  constructor(private apiService:ApiService,
    private todoStore:TodoStore,
    private todoQuery:TodoQuery,
    private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required])
    });
    this.todoQuery.getLoading().subscribe(res=>this.isLoading=res);
  }
  addToDo(){
    console.log(this.form?.value);
    this.todoStore.setLoading(true);
    this.apiService.addToDo(this.form?.controls['title'].value,
    this.form?.controls['description'].value).subscribe(res=>{
      this.todoStore.update(state=>{
        return{
          todos:[
            ...state.todos,
            res
          ]
        }
      });
      this.todoStore.setLoading(false);
      this.router.navigateByUrl('');
    })
  }
}
