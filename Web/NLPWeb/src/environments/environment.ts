// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};



export const pipelineData = {
  Comment_Type: "social_media",
  TopNCategories: "3",
  ModelFilesPath: "/data/D_Drive/All_Models/all_clients_and_languages_models",
  BatchSizetoProcess: "1000",
  ClientCode: "TCI",
  IS_DEBUG: "False",
  Client_Name_Masking: "Toyota"
}


export const serviceInfo = {
  PythonServiceBaseURL: "http://172.21.3.196:8002",
  UserNameForExtrernalPythonService: "TCI",
  PasswordForExtrernalPythonService: "T0y0T@p@s$CI"
}

export const apiURL = "https://localhost:44365/api/values";
