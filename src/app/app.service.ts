import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {ToDo
 } from "./todo.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class ApiService{
    private readonly baseUrl=environment.baseUrl;

    constructor(private http:HttpClient){
                    
    }

    addToDo(title:string, description:string):Observable<ToDo>{
        return this.http.post<ToDo>(this.baseUrl,{title, description});
    }

    getToDos():Observable<ToDo[]>{
        return this.http.get<{data:ToDo[]}>(this.baseUrl).pipe(
            map((res)=>res.data));
    }

    deleteToDo(id:string):Observable<ToDo>{
        return this.http.delete<ToDo>(`${this.baseUrl}/${id}`);
    }

    updateToDo(id:string, changes:any):Observable<ToDo>{
        return this.http.put<ToDo>(`${this.baseUrl}/${id}`,changes);
    }
}


