import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Message } from 'src/app/models/Message';
import { SendMessageService } from 'src/app/services/send-message/send-message.service';
// import {ScrollToBottomDirective} from "../../scroll-to-bottom.directive";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messages: Message[] = [];
  reply: string = '';
  interval: any;
  user: string = '';
  users: string[] = [];

  // @ViewChild(ScrollToBottomDirective)  scroll!: ScrollToBottomDirective;

  constructor(
    private messageService: SendMessageService,
  ) {}

  ngOnInit(): void {

    this.messageService.getUser().subscribe(
      (data) => this.users = data,
      (err) => console.log(err),
      () => console.log("retrieved users")
    );

    this.user = this.users[0];
    this.refreshData();

    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 3000);
  }

  refreshData(): void{
    this.messageService.getMessages(this.user).subscribe(data => this.messages = data);
  }
  refreshUsers(): void{
    this.messageService.getUser().subscribe(
      (data) => this.users = data,
      (err) => console.log(err),
      () => console.log("retrieved users")
    );
  }

  switchUser(user: string): void{
    this.user = user;
    this.messages = [];
    console.log(user, this.user);
    this.refreshData();
  }

  send(): void{
    const message = new Message("ADMIN", this.reply);
    console.log(message);
    console.log(this.user);
    this.messageService.sendMessage(this.user, message).subscribe();
    this.refreshData();
    this.refreshUsers();
    this.reply = '';
  }


}

