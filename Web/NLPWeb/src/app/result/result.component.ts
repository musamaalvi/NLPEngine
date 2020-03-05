import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})



export class ResultComponent implements OnInit {
  @Input() NLPResult ;
  @Input() ResultProcessed: boolean = false
  @Input() CommentText
  @Input() index
  @Output() DeleteIndex = new EventEmitter()
  constructor() { 
  
   
  }

  ngOnInit() {
  

  
  }
  RemoveComment(){
    this.DeleteIndex.emit(this.index)
  }
}
