import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { FormsModule } from '@angular/forms'
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ScrollToBottomDirectiveDirective } from './scroll-to-bottom-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ScrollToBottomDirectiveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
