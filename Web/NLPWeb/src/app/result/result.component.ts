import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})



export class ResultComponent implements OnInit {
  @Input() NLPResult ;

  constructor() { 
    debugger
   
  }

  ngOnInit() {
    console.log(this.NLPResult)
  }

}