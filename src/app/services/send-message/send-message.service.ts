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
    // const username = 'leeroy';
    // const payload = JSON.stringify(message);
    return this.http.post<Message>(`https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/adriano/post`, message)
  }

  getMessages(): Observable<Message[]>{
    const username = 'leeroy';
    return this.http.get<Message[]>(`https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/adriano/retrieve`)
  }

}


