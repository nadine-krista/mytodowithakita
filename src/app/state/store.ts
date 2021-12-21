import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { ToDo } from "../todo.model";
export interface ToDoState{
    todos:ToDo[],
    isLoaded:boolean
}

export const getInitialState=()=>{
    return{
        todos:[],
        isLoaded:false
    };
};

@Injectable({
    providedIn:'root'
})
@StoreConfig({name:'todo'})
export class TodoStore extends Store<ToDoState>{
    constructor(){
        super(getInitialState());
    }
}