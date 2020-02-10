using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using Newtonsoft.Json;
using System.Text;
using Ionic.Zlib;

namespace NLPAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        public struct ClassificationDTO
        {
            public tokenRequestDTO access;
            public ProcessRequestDTO docs;
        }

        public struct EncodedProcessResponseDTO
        {
            public string response;

        }

        public struct ProcessResponseDTO
        {
            public string status;
            public string message;
            public List<DocPrediction> predictions;

        }
        public struct DocPrediction
        {
            public string id;
            public List<DocCategory> categorization;
            public List<Topics> topic_identification;
            public List<POSDescription> linguistic_features;
            public bool is_repr_for_cat;
            public bool is_repr_for_sentiment;
            public string source_language_code;
            public string text_translation;
        }
        public struct DocCategory
        {
            public string category;
            public string category_label;
            public double category_probability;

            public string sentiment_label;
            public string sentiment_id;
            public double sentiment_probability;
            public double sentiment_score;
            public string text_chunk;

            public int start_index;
            public int end_index;

            public int ensemble_sentiment_id;
            public string ensemble_sentiment_label;
            public double ensemble_sentiment_probability;
            public double ensemble_sentiment_score;

        }
        public struct Topics
        {
            public string topic;
            public string topic_base;
            public string topic_lemma;

        }
        public struct ProcessRequestDTO
        {
            public int top_n_categories;
            public string language;
            public string model_path;
            public string client;
            public string comment_type;
            public bool detailed_response_required;
            public List<Doc> docs;
            public List<string> pipeline;
            public string token;
            public bool is_request_production;
            public string client_name_for_masking;


        }
        public struct Doc
        {
            public string id;
            public string text;
            public int? rating;
            public int? default_sentiment;
            public int? default_area_of_focus;
        }
        public struct POSDescription
        {
            public string l;
            public string p;
            public string t;
            public int ti;
            public int si;
            public int ei;
        }
        public struct tokenResult
        {
            public string duration;
            public string token;
        }
        public struct testingData {
            public string value;
        }
        public struct tokenRequestDTO
        {
            public string PythonServiceBaseURL;
            public string userNameForExternalPythonService;
            public string passwordForExternalPythonService;
        }



        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("GetCommentClassify")]
        public string Post(testingData vara)
        {
            return "worked posting";
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }



        [HttpPost("Classify")]
        public ProcessResponseDTO ProcessPipeline(ClassificationDTO data)
        {
            try
            {

                HttpStatusCode statusCode;
                ProcessRequestDTO postObj = data.docs ;
                postObj.client = data.docs.client;

               // JavaScriptSerializer req_serializer = new JavaScriptSerializer();
                //req_serializer.MaxJsonLength = Int32.MaxValue;
                var json = JsonConvert.SerializeObject(postObj);

                //var json = new JavaScriptSerializer().Serialize(postObj);
                string respone = MakeHttpPostRequest(data.access.PythonServiceBaseURL + "/prediction_service/process_pipeline", json, out statusCode);

                //Logger.Info("Response Received");

                //JavaScriptSerializer serializer = new JavaScriptSerializer();
                //serializer.MaxJsonLength = Int32.MaxValue;
                EncodedProcessResponseDTO resObj = (EncodedProcessResponseDTO) JsonConvert.DeserializeObject(respone, typeof(EncodedProcessResponseDTO));

                //Logger.Info("Deserialized");

                var sOutput = new MemoryStream();
                string text;
                byte[] gzBuffer = Convert.FromBase64String(resObj.response);
                using (var ms = new MemoryStream())
                {
                    ms.Write(gzBuffer, 0, gzBuffer.Length);
                    var buffer = new byte[ms.Length * 1024];
                    ms.Position = 0;
                    using (var infS = new ZlibStream(ms, Ionic.Zlib.CompressionMode.Decompress))
                    {
                        infS.Read(buffer, 0, buffer.Length);
                        //infS.CopyTo(sOutput);
                    }
                    text = Encoding.UTF8.GetString(buffer, 0, buffer.Length);
                }

                text = text.TrimEnd('\0');
                ProcessResponseDTO responseObj = (ProcessResponseDTO)JsonConvert.DeserializeObject(text, typeof(ProcessResponseDTO));
                //Logger.Info("Decoded data =>" + responseObj);
                if (statusCode != HttpStatusCode.OK)
                    throw new Exception("Web request failure during process pipeline. Status Code:" + statusCode.ToString());
                else if (responseObj.message == "Token is valid but Expired, Please generate request to get new token")
                {
                    //tokenResult tr = Authorization(pythonBasedURL, User, Password);
                    //docs.token = tr.token;
                    //ProcessResponseDTO responseObj1 = ProcessPipeline(docs, pythonBasedURL, User, Password);
                    //return responseObj1;
                }
                else if (!responseObj.status.Equals("success"))
                {
                    throw new Exception(responseObj.message);
                }


                return responseObj;
            }
            catch (Exception ex)
            {
                //Logger.Info(ex.Message);

            }
            return new ProcessResponseDTO();
        }

        [HttpPost("Authorize")]
        public tokenResult Authorization(tokenRequestDTO access)
        {
            WebRequest request;
            Stream dataStream;
            String url = access.PythonServiceBaseURL + "/prediction_service/token";
            // Create a request using a URL that can receive a post.

            request = WebRequest.Create(url);



            // Set the Method property of the request to POST.
            request.Method = "GET";


            request.ContentType = "application/json";

            NetworkCredential myCred = new NetworkCredential(access.userNameForExternalPythonService,
                access.passwordForExternalPythonService);
            request.Credentials = myCred;
            // Get the original response.
            WebResponse response = request.GetResponse();

            var Status = ((HttpWebResponse)response).StatusDescription;

            // Get the stream containing all content returned by the requested server.
            dataStream = response.GetResponseStream();

            // Open the stream using a StreamReader for easy access.
            StreamReader reader = new StreamReader(dataStream);

            // Read the content fully up to the end.
            string responseFromServer = reader.ReadToEnd();
            try
            {
                var obj = new tokenResult();
                obj = (tokenResult) JsonConvert.DeserializeObject(responseFromServer, typeof(tokenResult));
                //obj = (tokenResult)new JavaScriptSerializer().Deserialize(responseFromServer, typeof(tokenResult));
               // Logger.Info("Authorization Module Module :: Token Granted");
                return obj;


            }
            catch (Exception e)
            {
                //Logger.Info("Authorization Module Module :: User Not Found");
                return new tokenResult();

            }

        }
        private string MakeHttpPostRequest(string url, string json, out HttpStatusCode statusCode)
        {
            // Create a request using a URL that can receive a post.   
            WebRequest request = WebRequest.Create(url);
            // Set the Method property of the request to POST.  
            request.Method = "POST";

            //var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(userNameForExternalPythonService + ":" + passwordForExternalPythonService);
            //var encodeText = System.Convert.ToBase64String(plainTextBytes);
            //request.Headers.Add("Authorization", "Basic " + encodeText);

            // Create POST data and convert it to a byte array.

            byte[] byteArray = Encoding.UTF8.GetBytes(json);
            // Set the ContentType property of the WebRequest.  
            request.ContentType = "application/json";
            // Set the ContentLength property of the WebRequest.  
            request.ContentLength = byteArray.Length;

            request.Timeout = 5 * 60 * 60 * 1000; //5 hours

            // Get the request stream.  
            Stream dataStream = request.GetRequestStream();
            // Write the data to the request stream.  
            dataStream.Write(byteArray, 0, byteArray.Length);
            // Close the Stream object.  
            dataStream.Close();
            // Get the response.  
            WebResponse response = request.GetResponse();
            // Display the status.  
            statusCode = ((HttpWebResponse)response).StatusCode;
            // Get the stream containing content returned by the server.  
            dataStream = response.GetResponseStream();
            // Open the stream using a StreamReader for easy access.  
            StreamReader reader = new StreamReader(dataStream);
            // Read the content.  
            string responseFromServer = reader.ReadToEnd();

            // Clean up the streams.  
            reader.Close();
            dataStream.Close();
            response.Close();

            return responseFromServer;
        }
    }
}
