import { Component, OnInit } from '@angular/core';
import {serviceInfo, apiURL, pipelineData} from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tokenResult, tokenRequestDTO, ProcessRequestDTO, Doc, ClassificationDTO} from '../../Models/DTOs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {
  data: any;
  resultData: any = {
  };
  tokenRequest:tokenRequestDTO = new tokenRequestDTO()
  tokenResult: tokenResult = new tokenResult()
  postObj: ProcessRequestDTO = new ProcessRequestDTO()
  doc: Doc = new Doc()
  ClassiReq: ClassificationDTO = new ClassificationDTO()
  CommentNumber: any[] = [];
  resultReceived:boolean = false
  resultLoaderBoolean = false
  ResultProcessed:boolean = false


  CommentText: string;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,  private router: Router) {}
  ngOnInit() {  }



  classify(){
    this.resultLoaderBoolean = true
    console.log(this.CommentNumber);


    this.tokenRequest.PythonServiceBaseURL = serviceInfo.PythonServiceBaseURL;
    this.tokenRequest.userNameForExternalPythonService = serviceInfo.UserNameForExtrernalPythonService;
    this.tokenRequest.passwordForExternalPythonService = serviceInfo.PasswordForExtrernalPythonService;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };



    this.callForAuth(this.tokenRequest,  httpOptions);


  }
  AddComment(){
    this.CommentNumber.push({value: this.CommentText, index: 1})
    this.CommentText=""
    this.ResultProcessed=false
  }
  DeleteComment(){
    this.CommentNumber.pop()
  }
  callForAuth( TK, httpOptions){
    this.httpClient.post(apiURL + '/Authorize',TK,httpOptions) .subscribe(data => {
      debugger;
     this.data = data;

     this.tokenResult = this.data;
    this.callForClassification(httpOptions)
    })
  }

  callForClassification(httpOptions){

    this.postObj.client = pipelineData.ClientCode;
    this.postObj.client_name_for_masking = pipelineData.Client_Name_Masking;
    this.postObj.comment_type = pipelineData.Comment_Type;
    this.postObj.detailed_response_required = false;
    this.postObj.is_request_production = true;
    this.postObj.language = 'English';
    this.postObj.model_path = pipelineData.ModelFilesPath
    this.postObj.pipeline = []
    this.postObj.pipeline.push('categorization')
    this.postObj.pipeline.push('sentiment')
    this.postObj.pipeline.push('ensemble_sentiment')
    this.postObj.pipeline.push('deep_sentiment')
    this.postObj.pipeline.push('linguistic_features')
    this.postObj.pipeline.push('topic_identification')
    this.postObj.token = this.tokenResult.token;
    this.postObj.top_n_categories = 3
    this.postObj.docs = []

    for(var i=0;i<this.CommentNumber.length;i++){
      var doc: Doc = new Doc()
      doc.id=i.toString()
      doc.text = this.CommentNumber[i].value
      this.postObj.docs.push(doc);
    }

    // this.doc.id = '123';
    // this.doc.text = this.CommentText



    console.log(this.CommentText)
    this.ClassiReq.docs=this.postObj
    this.ClassiReq.access = this.tokenRequest
    this.httpClient.post(apiURL + "/Classify",this.ClassiReq,httpOptions) .subscribe(data => {
      this.resultData=data
      this.resultReceived = true
      this.resultLoaderBoolean = false
      this.ResultProcessed=true
      debugger;

    })
  }

}
