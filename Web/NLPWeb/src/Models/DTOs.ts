

export class tokenResult {
  token: string;
  duration: string;
}


export class tokenRequestDTO {
  PythonServiceBaseURL: string
  userNameForExternalPythonService: string
  passwordForExternalPythonService: string

}

export class ClassificationDTO {
  access: tokenRequestDTO;
  docs: ProcessRequestDTO;
}

export class ProcessRequestDTO {
  top_n_categories: number;
  language: string;
  model_path: string;
  client: string;
  comment_type: string;
  detailed_response_required: boolean;
  docs: Doc[];
  pipeline: string[];
  token: string;
  is_request_production: boolean
  client_name_for_masking: string;


}
export class Doc {
  id: string;
  text: string;
  rating: number;
  default_sentiment: number;
  default_area_of_focus: number;
}


    // export class ClassificationDTO
    // {
    //     public AuthorizeDTO access;
    //     public ProcessRequestDTO docs;
    // }