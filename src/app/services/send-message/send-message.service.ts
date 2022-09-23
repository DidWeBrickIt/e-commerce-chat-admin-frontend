import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Message } from 'src/app/models/Message';



@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private http:HttpClient) { }

  sendMessage(user: string, message: Message): Observable<Message>{
    console.log(user, message);
    return this.http.post<Message>(`https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/${user}/post`, message);
  }

  getUser(): Observable<string[]>{
    return this.http.get<string[]>(`https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/tables`)
  }

  getMessages(user: string): Observable<Message[]>{
    const username = user;
    return this.http.get<Message[]>(`https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/${username}/retrieve`);
  }

}


