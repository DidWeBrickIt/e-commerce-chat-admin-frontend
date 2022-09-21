import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/models/Message';



@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private http:HttpClient) { }

  sendMessage(message: Message) :Observable<Message>
  {
    const payload = JSON.stringify(message);
    return this.http.post<Message> (`localhost:8080`, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }
  
}


