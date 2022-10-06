import { Controller, Get, Param, Body, ParseIntPipe, Put, Post, Delete, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
const { v4: uuidv4 } = require('uuid');
const fsPromises = require('fs').promises;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /////////////////   Notes   ////////////////////
  private notes: Array<string> = [];

  @Get('notes')
  public getNotes(): Array<string> {
    return this.notes;
  }

  @Post('notes')
  public postNote(@Body() note: JSON): Object{
    if(!note.hasOwnProperty('content')){
      const message = {detail: [{loc: ["postNote",27],msg: "no content",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }


    this.notes.push(note['content']);
    const id:number = this.notes.length - 1;
    return {index:id, content:note['content']};
  }

  @Get('notes/:id')
  public getNote(@Param('id', ParseIntPipe) id:number): string {
    if(typeof this.notes[id] === 'undefined'){
      const message = {detail: [{loc: ["getNote",40],msg: "index does not exist",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }


    return this.notes[id];
  }

  @Put('notes/:id')
  public putNote(@Param('id', ParseIntPipe) id:number, @Body() note: JSON): Object{
    if(typeof this.notes[id] === 'undefined'){
      const message = {detail: [{loc: ["putNote",55],msg: "index does not exist",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if(!note.hasOwnProperty('content')){
      const message = {detail: [{loc: ["putNote",55],msg: "no content",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }


    this.notes[id] = note['content'];
    return {index:id, content:note['content']};
  }

  @Post('notes/:id')
  public postNoteByIndex(@Param('id', ParseIntPipe) id:number, @Body() note:JSON): Object{
    if(!note.hasOwnProperty('content')){
      const message = {detail: [{loc: ["postNoteByIndex",66],msg: "no content",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    this.notes.splice(id, 0, note['content']);
    return {index:id, content:note['content']};
  }

  @Delete('notes/:id')
  @HttpCode(204)
  public deleteNote(@Param('id', ParseIntPipe) id:number) {
    if(typeof this.notes[id] === 'undefined'){
      const message = {detail: [{loc: ["deleteNote",78],msg: "index does not exist",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    this.notes.splice(id,1);
  }

  ////////////    Documents    ////////////////////
  @Post('documents')
  public async saveDoc(@Body() body:JSON): Promise<Object> {
    if(!body.hasOwnProperty('content')){
      const message = {detail: [{loc: ["saveDoc",89],msg: "no content",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const docId = uuidv4();
    await fsPromises.writeFile(`${docId}.txt`, body['content']);
    return {docId};
  }

  @Get('documents/:id')
  public async getDoc(@Param('id') docId:string): Promise<Object>{
    if(!fsPromises.existsSync(`${docId}.txt`)){
      const message = {detail: [{loc: ["getDoc",100],msg: "file does not exist",type: "Validation Error"}]}
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const bytes = await fsPromises.readFile(`${docId}.txt`);
    const content = bytes.toString();
    return {docId, content};
  }

  ////////////    Other    ////////////////////

  @Get()
  public getHello(): Object {
    return {content: this.appService.getHello()}
  }

  @Get('math/:num1/:num2/:amount')
  public getMath(@Param('num1',ParseIntPipe) num1:number, @Param('num2',ParseIntPipe) num2:number, @Param('amount',ParseIntPipe) amount:number): Object  {
    for(let i = 0; i < amount; i++) num1*num2;

    return {content:'Complete'};
  }

  @Get('factorial/:num')
  public getFactorial(@Param('num', ParseIntPipe) num:number): Object {
    let product = num;
    for(let i = num-1; i > 0; i--){
      product *= i;
    }
    return {content:product};
  }

  @Get('coordinates/:amount')
  public makeCoords(@Param('amount', ParseIntPipe) amount:number): Object {
    const coords = []

    for(let i = 0; i < amount; i++){
      const lattitude = Math.random() * 180 - 90;
      const longitude = Math.random() * 360 - 180;
      const nsHemisphere = lattitude>0? "North" : "South";
      const ewHemisphere = longitude>0? "East" : "West";
      const coordiante = {lattitude,longitude,nsHemisphere,ewHemisphere};

      coords.push(coordiante);
    }

    return {content:coords};
  }

}
