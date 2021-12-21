import { Injectable } from '@angular/core';
import {Query} from '@datorama/akita';
import { Observable } from 'rxjs';
import { ToDo } from '../todo.model';
import { ToDoState,TodoStore } from './store';
@Injectable({
    providedIn:'root'
})
export class TodoQuery extends Query<ToDoState>{
    constructor(private todoStore:TodoStore){
        super(todoStore);
    }

    getTodos(): Observable<ToDo[]>{
        return this.select(state=>state.todos);
    }

    getLoaded(): Observable<boolean>{
        return this.select(state=>state.isLoaded);
    }

    getLoading():Observable<boolean>{
        return this.selectLoading();
    }
}