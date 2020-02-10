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
  tokenRequest:tokenRequestDTO = new tokenRequestDTO()
  tokenResult: tokenResult = new tokenResult()
  postObj: ProcessRequestDTO = new ProcessRequestDTO()
  doc: Doc = new Doc()
  ClassiReq: ClassificationDTO = new ClassificationDTO()
  CommentNumber: any[] = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient,  private router: Router) {}
  ngOnInit() {  }



  classify(){

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
    this.CommentNumber.push({value: '', index: 1})
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
    this.postObj.token = this.tokenResult.token;
    this.postObj.top_n_categories = 3
    this.doc.id = '123';
    this.doc.text = 'it was a good experience and fast service'
    this.postObj.docs = []
    this.postObj.docs.push(this.doc);


    this.ClassiReq.docs=this.postObj
    this.ClassiReq.access = this.tokenRequest
    this.httpClient.post(apiURL + "/Classify",this.ClassiReq,httpOptions) .subscribe(data => {
      debugger;

    })
  }

}
