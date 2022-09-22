import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Message } from 'src/app/models/Message';



@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private http:HttpClient) { }

  sendMessage(message: Message): Observable<Message>{
    const username = 'leeroy';
    const payload = JSON.stringify(message);
    return this.http.post<Message>(`http://localhost:8080/${username}/post`, payload)
  }

  getMessages(): Observable<Message[]>{
    const username = 'leeroy';
    return this.http.get<Message[]>(`http://localhost:8080/${username}/retrieve`)
  }

}


