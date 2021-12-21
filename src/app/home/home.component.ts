import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { ApiService } from '../app.service';
import { TodoQuery } from '../state/query';
import { TodoStore } from '../state/store';
import { ToDo, TodoStatus } from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading=false;
  todos:ToDo[]=[];
  constructor(private router:Router, 
    private todoQuery:TodoQuery,
    private todoStore:TodoStore,
    private apService:ApiService) { }

  ngOnInit(): void {
    this.todoQuery.getLoading().subscribe(res=>this.isLoading=res);
    this.todoQuery.getTodos().subscribe(res=>this.todos=res);
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter(res=>!res),
      switchMap(()=>{
        this.todoStore.setLoading(true);
        return this.apService.getToDos();
      })
    ).subscribe(res=>{
      this.todoStore.update(state=>{
        return{
          todos:res,
          isLoaded:true
        }
      })
      this.todoStore.setLoading(false);
    }, err=>{
      this.todoStore.setLoading(false);
    })
  }

  addToDo(){
    this.router.navigateByUrl('/add-todo');
  }

  updateTodo(id:string){
    this.todoStore.setLoading(true);
    this.apService.updateToDo(id,{status:TodoStatus.DONE}).subscribe(res=>{
      this.todoStore.update(state=>{
        const todos=[...state.todos];
        const index=todos.findIndex(todo=>todo._id===id);
        todos[index]=res;
        return{
          todos:todos
        }
       
      })
      this.todoStore.setLoading(false);
    },err=>{console.log(err); this.todoStore.setLoading(false);})
  }

  deleteToDo(id:string){ 
    this.todoStore.setLoading(true);

    this.apService.deleteToDo(id).subscribe(res=>{
     this.todoStore.update(state=>{
       const todos = [...state.todos];
       const index = todos.findIndex(todo=>todo._id===id);
       todos.splice(index,1);
       return{
         todos:todos
       }
     })
     this.todoStore.setLoading(false);
    },err=>{
      console.log(err);
      this.todoStore.setLoading(false);
    })
  }

}
