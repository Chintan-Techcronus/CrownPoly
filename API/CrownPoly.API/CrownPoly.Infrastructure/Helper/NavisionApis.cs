using CrownPoly.Core.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System;
using System.Net.Http.Json;
using System.Web;
using System.Text;
using Microsoft.AspNetCore.JsonPatch;
using System.Globalization;

namespace CrownPoly.API.Helper
{
    public class NavisionApis
    {
        #region Get token
        public static async Task<string> getBearerAccessToken()
        {
            string clientId = "0cff32a0-1778-41c9-881c-689d203784ad";
            string secret = "i_68Q~WqRSnmuE049kvD3vEjjzcT7SZibbZrTb.g";
            string url = "https://login.microsoftonline.com/c3c096f5-ee40-470a-b3da-eaf7010658e2/oauth2/v2.0/token";
            HttpClient httpClient = new HttpClient();
            var content = new StringContent("grant_type=client_credentials&scope=https://api.businesscentral.dynamics.com/.default&client_id="
            + HttpUtility.UrlEncode(clientId) + "&client_secret=" + HttpUtility.UrlEncode(secret));
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-www-form-urlencoded");
            var response = await httpClient.PostAsync(url, content);
            if (response.IsSuccessStatusCode)
            {
                JObject result = JObject.Parse(await response.Content.ReadAsStringAsync());
                return result["access_token"].ToString();
            }
            else
            {
                return "";
            }
        }
        #endregion Get token

        private static string tenant_id = "c3c096f5-ee40-470a-b3da-eaf7010658e2";
        static string environment = "Sandbox";
        static string CRONUS_USA_Inc = "4fc9cd82-fbbf-ee11-907a-000d3a583979"; //Crownpoly prod --4a03c7b5-b48e-ee11-817a-6045bdd73d94[test]

        // ItemDetails
        public string getItemDetailsApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Item_GetItemDetails?company={CRONUS_USA_Inc}";

        // IsLottrack
        //public string lotTrackApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2Item_IsLotTracked?company=CRONUS USA, Inc.";
        public string lotTrackApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Item_IsLotTracked?company={CRONUS_USA_Inc}";

        // Users
        //public string UsersApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/api/crownploy/crownploy/v2.0/companies(f1a13d54-c32f-ee11-bdfb-6045bdc8a7d3)/adduser";

        //GetUserWiseProdlines
        public string GetUserWiseProdlinesAPI = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblUserProdLineMap_GetUserWiseProdlines?company={CRONUS_USA_Inc}";

        // Users
        public string UsersApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownploy/crownploy/v2.0/companies({CRONUS_USA_Inc})/adduser";

        //GetProdLine
        public string GetProdLineAPI = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/tblProdLines";

        //Check pin 
        public string checkPin = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_CheckPin?company={CRONUS_USA_Inc}";

        //AddUserApi
        public string addUserApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_AddUser?company={CRONUS_USA_Inc}";

        //Update user api
        public string updateUserApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_UpdateUser?company={CRONUS_USA_Inc}";

        //GetUsersWithProdline
        public string getUserswithProdline = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_GetUserWithProdLine?company={CRONUS_USA_Inc}";

        //userbyid 
        public string userbyidApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_GetSeperateUser?company={CRONUS_USA_Inc}";
        // ActiveLines
        public string LinesApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ActiveLine_ActivateLine?company={CRONUS_USA_Inc}";

        //endproduction
        public string endproductionApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblBatchCases_EndProduction?company={CRONUS_USA_Inc}";

        //Re-ActiveLine 
        public string reactiveApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ActiveLine_DeactivateLine?company={CRONUS_USA_Inc}";

        // department list
        public string departmentlistapi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/getdepartmentlist";

        //machine center api
        public string machineCenterApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/api/crownpoly/crownpoly/v2.0/companies(f1a13d54-c32f-ee11-bdfb-6045bdc8a7d3)/machinecenter";

        //getalllinesApi api
        public string getalllinesApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/machinecenter";
        
        //GetPalletItemsApi api
        public string getPalletItemsApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_GetPalletItems?company={CRONUS_USA_Inc}";

        // scrap api
        public string scrapApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/api/crownploy/crownploy/v2.0/companies(f1a13d54-c32f-ee11-bdfb-6045bdc8a7d3)/item";
        // write log
        public string writeLogApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblLog_WriteLog?company={CRONUS_USA_Inc}";
        // login user
        // public string loginUserApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2User_GetUserID?company=CRONUS USA, Inc.";
        public string loginUserApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2User_LoginUser?company={CRONUS_USA_Inc}";

        // getItemKey
        public string getItemKeyApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ProdOrderLine_GetItemKey?company={CRONUS_USA_Inc}";

        // get open prod by line
        // public string getOpenProdApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2ProdOrderLine_GetOpenProd?company=CRONUS USA, Inc.";
        public string getOpenProdApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ProdOrderLine_GetOpenProd?company={CRONUS_USA_Inc}";

        // public string getOpenProdApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2ProdOrderLine_GetOpenProd?company=CRONUS USA, Inc.";
        public string ProdorderOpen = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ProdOrderLine_IsProdorderOpen?company={CRONUS_USA_Inc}";


        // get item key2
        public string getItemKey2Api = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ItemLedgerEntry_GetItemKey2?company={CRONUS_USA_Inc}";

        // check lot
        public string checkLotApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ItemLedgerEntry_CheckLot?company={CRONUS_USA_Inc}";

        // record consumption
        //public string recordCosumptionApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2ConsumptionJournal_RecordConsumption?company=CRONUS USA, Inc.";
        public string recordCosumptionApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ConsumptionJournal_RecordConsumption?company={CRONUS_USA_Inc}";

        //getstotime 
        public string getstopTimeApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/getstoptime";

        // get problem area
        public string getProblemDescApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Incident_GetProblemDesc?company={CRONUS_USA_Inc}";

        //CheckActiveLine
        //public string isLineActiveApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2ActiveLine_IsLineActive?company=CRONUS USA, Inc.";
        public string isLineActiveApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ActiveLine_IsLineActive?company={CRONUS_USA_Inc}";

        //GetShift
        public string getShiftApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ShiftCalander_GetShift?company={CRONUS_USA_Inc}";

        public string getCasesProducedApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblBatchCases_GetCasesProduced?company={CRONUS_USA_Inc}";

        public string getcaseonpaallet = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_GetCasesOnPallet?company={CRONUS_USA_Inc}";

        public string getProdCasesApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2OutPutJournal_GetProdCases?company={CRONUS_USA_Inc}";

        public string openLinesApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2MachineCenter_GetOpenLines?company=({CRONUS_USA_Inc})";

        //Incidents
        public string getIncidentDetails = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/getproblemdesc";

        //Problemarea
        // public string getProblemareaDetails = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/api/crownpoly/crownpoly/v2.0/companies(f1a13d54-c32f-ee11-bdfb-6045bdc8a7d3)/getproblemarea";
        public string getProblemareaDetails = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblProbelmArea_GetProblemArea?company={CRONUS_USA_Inc}";

        //Recordincident
        // public string addrecordincidentdata = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/api/crownpoly/crownpoly/v2.0/companies(f1a13d54-c32f-ee11-bdfb-6045bdc8a7d3)/recordincident";
        public string addrecordincidentdata = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2RecordIncident_RecordIncident?company={CRONUS_USA_Inc}";
        //BatchData
        public string addbatchdata = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblBatchCases_AddBatchCase?company={CRONUS_USA_Inc}";

        //weights
        public string getweights = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblWeight_GetWeights?company={CRONUS_USA_Inc}";

        //closeline
        public string getclosedlines = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownpoly/crownpoly/v2.0/companies({CRONUS_USA_Inc})/tblActiveLine";
        // Users
        //public string UsersApi = "https://api.businesscentral.dynamics.com/v2.0/c3c096f5-ee40-470a-b3da-eaf7010658e2/Sandbox/Odatav4/CPAPIV2User_AddUser?company=CRONUS USA, Inc.";

        public string recordproduction = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2OutPutJournal_RecordProduction?company={CRONUS_USA_Inc}";

        public string getreprolotApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblNavWrites_GetReproLot?company={CRONUS_USA_Inc}";

        public string getuomApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Item_GetUOM?company={CRONUS_USA_Inc}";

        public string recordscrap = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2ItemJournal_RecordScrap?company={CRONUS_USA_Inc}";
        //proHS-TB

        //GetPalletCaseCount
        public string GetPalletCaseCountApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_GetPalletCaseCount?company={CRONUS_USA_Inc}";
        public string WriteExceptionApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Exception_WriteException?company={CRONUS_USA_Inc}";

        //mrlotno
        public string MRLotNumberApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2GetMRLotNumber_GetMRLotNumber?company={CRONUS_USA_Inc}";

        //mslotno
        public string MsLotNumberApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblMSLotNumber_GetMSLotNumber?company={CRONUS_USA_Inc}";

        public string getLinesApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2MachineCenter_GetLines?company={CRONUS_USA_Inc}";

        public string getscrapitemsApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Item_GetScrapItems?company={CRONUS_USA_Inc}";

        public string PalletSizeApi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2Item_GetPalletSize?company={CRONUS_USA_Inc}";

        public string setpalletapi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_SetPallet?company={CRONUS_USA_Inc}";

        public string PrintLastPalletapi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_PrintLastPallet?company={CRONUS_USA_Inc}";

        public string palletcasereportapi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_ReportPalletCases?company={CRONUS_USA_Inc}";

        public string movepalletcaseapi = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblPallet_MoveCases?company={CRONUS_USA_Inc}";

        public string getalltaglist = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/api/crownploy/crownploy/V2.0/companies({CRONUS_USA_Inc})/PalletBuffer";

        public string getlottagbyno = $"https://api.businesscentral.dynamics.com/v2.0/{tenant_id}/{environment}/Odatav4/CPAPIV2tblBatchCases_GetUniquePalletBuffer?company={CRONUS_USA_Inc}";
        public async Task<List<CasesOnPalletResponse>> GetCasesOnPallet(CasesOnPalletRequest casesProducedRequest)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getcaseonpaallet), casesProducedRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            CasesOnPalletResponseData responseData = JsonConvert.DeserializeObject<CasesOnPalletResponseData>(jsonString);
            if (responseData != null && responseData.casesonpalletresponse != null && responseData.casesonpalletresponse.Count > 0)
                return responseData.casesonpalletresponse;
            return null;
        }

        public async Task<List<CasesProducedResponse>> GetCasesProduced(CasesProducedRequest casespallet)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getCasesProducedApi), casespallet).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            CasesProducedData responseData = JsonConvert.DeserializeObject<CasesProducedData>(jsonString);
            if (responseData != null && responseData.casesProducedResponses != null && responseData.casesProducedResponses.Count > 0)
                return responseData.casesProducedResponses;
            return null;
        }

        public async Task<List<ProdCases>> GetProdCases(ProdCaseRequest producedRequest)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getProdCasesApi), producedRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            //jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}");
            ProdCaseData responseData = JsonConvert.DeserializeObject<ProdCaseData>(jsonString);
            if (responseData != null && responseData.ProdCaseDataResponses != null && responseData.ProdCaseDataResponses.Count > 0)
                return responseData.ProdCaseDataResponses;
            return null;
        }

        public async Task<int> RecordConsumption(RecordConsumptionRequest recordConsumptionRequest)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            CheckLotRequest checkLotRequest = new CheckLotRequest();
            //checkLotRequest.lotNumber = lotNumber;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(recordCosumptionApi), recordConsumptionRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            RecordConsumptionData responseData = JsonConvert.DeserializeObject<RecordConsumptionData>(jsonString);
            if (responseData != null && responseData.recordConsumptionResponses != null && responseData.recordConsumptionResponses.Count > 0)
                return 1;
            return 0;
        }

        public async Task<List<CheckLotResponse>> checkLot(string lotNumber)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            CheckLotRequest checkLotRequest = new CheckLotRequest();
            checkLotRequest.lotNumber = lotNumber;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(checkLotApi), checkLotRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            CheckLotData responseData = JsonConvert.DeserializeObject<CheckLotData>(jsonString);
            if (responseData != null && responseData.checkLotData != null && responseData.checkLotData.Count > 0)
                return responseData.checkLotData;
            return null;
        }

        public async Task<List<GetItemKey2Response>> getItemKey2(GetItemKey2Request getItemKey2Request)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getItemKey2Api), getItemKey2Request).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            GetItemKey2Data responseData = JsonConvert.DeserializeObject<GetItemKey2Data>(jsonString);
            if (responseData != null && responseData.getItemKey2Responses != null && responseData.getItemKey2Responses.Count > 0)
                return responseData.getItemKey2Responses;
            return null;
        }

        public async Task<List<OrderDDLData>> IsProdOrderOpen(ProdOrderOpen prodOrderOpen)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(ProdorderOpen), prodOrderOpen).Result; //Isprodorderopen
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}");
            OrderDDLResponse responseData = JsonConvert.DeserializeObject<OrderDDLResponse>(jsonString);
            if (responseData != null && responseData.orderDDLData != null && responseData.orderDDLData.Count > 0)
                return responseData.orderDDLData;
            return null;
        }

        public async Task<List<OrderDDLData>> GetOpenProdByLine(LinesDDL linesDDL)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getOpenProdApi), linesDDL).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}");
            OrderDDLResponse responseData = JsonConvert.DeserializeObject<OrderDDLResponse>(jsonString);
            if (responseData != null && responseData.orderDDLData != null && responseData.orderDDLData.Count > 0)
                return responseData.orderDDLData;
            return null;
        }

        public async Task<List<GetItemKeyResponse>> GetItemKey(string pronum)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            GetItemKeyRequest getItemKeyRequest = new GetItemKeyRequest();
            getItemKeyRequest.prodNum = pronum;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getItemKeyApi), getItemKeyRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}");
            GetItemKeyData responseData = JsonConvert.DeserializeObject<GetItemKeyData>(jsonString);
            if (responseData != null && responseData.getItemKeyResponses != null && responseData.getItemKeyResponses.Count > 0)
                return responseData.getItemKeyResponses;
            return null;
        }
        public async Task<int> isLotTracked(ProHsRequest prodNum)
        {
            ProdctionNum num = new ProdctionNum();
            num.ProdNum = prodNum.ProdNum;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(lotTrackApi), num).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            LotTrackedResponseData responseData = JsonConvert.DeserializeObject<LotTrackedResponseData>(jsonString);
            if (responseData != null && responseData.lottrackedresponsedata != null && responseData.lottrackedresponsedata.Count > 0)
                return 1;
            return 0;
        }
        public async Task<int> isLotTracked(ProdctionNum prodNum)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(lotTrackApi), prodNum).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            LotTrackedresponsedata responseData = JsonConvert.DeserializeObject<LotTrackedresponsedata>(jsonString);
            if (responseData!= null && responseData.LotTrackedData != null && responseData.LotTrackedData.Count > 0)
                return 1;
            return 0;
        }
        public async Task<int> addBatchCaseData(string requestApiUrl, AddBatchcase requestData)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(requestApiUrl), requestData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }
        public async Task<List<CrownPolyItem>> getItemDetails(string itemkey)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            ItemKeyData itemKeyData = new ItemKeyData();
            itemKeyData.itemKey = itemkey;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getItemDetailsApi), itemKeyData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\\\""", " ");
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            ItemData responseData = JsonConvert.DeserializeObject<ItemData>(jsonString);
            if (responseData.Items != null && responseData.Items.Count > 0)
                return responseData.Items;
            return null;
        }

        //ProMasterStrip
        public async Task<List<CoreTypes>> getWeightsData(string requestApiUrl, string typeArea)
        {
            CoreTypesarea types = new CoreTypesarea();
            types.TypeArea = typeArea;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(requestApiUrl), types).Result;
            //HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(requestApiUrl + "?$filter = typearea  eq '" + typeArea + "'")).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace("\"[", "[").Replace("]\"", "]"); ;
            CoreTypesData responseData = JsonConvert.DeserializeObject<CoreTypesData>(jsonString);
            if (responseData != null && responseData.Items != null && responseData.Items.Count > 0)
                return responseData.Items;
            return null;
        }

        public async Task<List<CrownPolyItem>> getScrapaData(string requestApiUrl, string workCenter)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(requestApiUrl + "?$filter = scrap eq true and scrapdept eq '" + workCenter + "'")).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            RequestResponseModel responseData = JsonConvert.DeserializeObject<RequestResponseModel>(jsonString);
            if (responseData != null && responseData.Items.Count > 0)
                return responseData.Items;
            return null;
        }

        //ProPNP
        public async Task<List<Incident>> getIncidentData()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getIncidentDetails)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            IncidentData responseData = JsonConvert.DeserializeObject<IncidentData>(jsonString);
            if (responseData != null && responseData.incidentresponse != null && responseData.incidentresponse.Count > 0)
                return responseData.incidentresponse;
            return null;
        }
        public async Task<List<ProblemAreas>> getProblemareaData()
        {
            workcenterdata data = new workcenterdata();
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            //HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(requestApiUrl + "?$filter = isactive  eq true and workcenter  eq '" + workcenter + "'")).Result;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getProblemareaDetails), data).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            ProblemAreaData responseData = JsonConvert.DeserializeObject<ProblemAreaData>(jsonString);
            if (responseData != null && responseData.Items != null && responseData.Items.Count > 0)
                return responseData.Items;
            return null;
        }
        //get problem desc
        public async Task<List<ProblemDescResponse>> GetProblemDesc(string problemcode)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            ProblemDescRequest problemDescRequest = new ProblemDescRequest();
            problemDescRequest.problemCode = problemcode;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getProblemDescApi), problemDescRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            ProblemDescData responseData = JsonConvert.DeserializeObject<ProblemDescData>(jsonString);
            if (responseData != null && responseData.problemDescResponses != null && responseData.problemDescResponses.Count > 0)
                return responseData.problemDescResponses;
            return null;
        }
        public async Task<int> addRecordIncidentData(string requestApiUrl, RecordsIncidents requestData)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            //requestData.MachineCenter = "";
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(requestApiUrl), requestData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            RecordsIncidentResponseData responseData = JsonConvert.DeserializeObject<RecordsIncidentResponseData>(jsonString);
            response.EnsureSuccessStatusCode();
            if (responseData != null && responseData.recordsIncidentsreponse != null && responseData.recordsIncidentsreponse.Count > 0)
                return 1;
            return 0;
        }
        public async Task<StopTime> GetStopTime()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getstopTimeApi)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            StopTimeResponseData responseData = JsonConvert.DeserializeObject<StopTimeResponseData>(jsonString);
            if (responseData != null && responseData.stoptimereponse != null && responseData.stoptimereponse.Count > 0)
                return responseData.stoptimereponse[0];
            return null;
        }
        //ProRepro
        public async Task<lotstartdata> GetProReproLotNo(ReproLot lotstrat)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getreprolotApi), lotstrat).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            ProReproLotNoResponseData responseData = JsonConvert.DeserializeObject<ProReproLotNoResponseData>(jsonString);
            if (responseData != null && responseData.reprolotnoresponse.Count > 0)
            {
                return responseData.reprolotnoresponse[0];
            }
            return null;
        }
        public async Task<UOMData> getUOMData(ProRepro itemkey)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            ItemKeyData itemKeyData = new ItemKeyData();
            itemKeyData.itemKey = itemkey.ItemKey;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getuomApi), itemKeyData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            ProReproUomresponseData responseData = JsonConvert.DeserializeObject<ProReproUomresponseData>(jsonString);
            if (responseData != null && responseData.ProReproUomresponse.Count > 0)
            {
                return responseData.ProReproUomresponse[0];
            }
            return null;
        }

        //ProScrap
        public async Task<List<WorkCenterData>> getDepartmentList()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(departmentlistapi)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            WorkCenterResponse responseData = JsonConvert.DeserializeObject<WorkCenterResponse>(jsonString);
            if (responseData != null && responseData.WorkCenterData != null && responseData.WorkCenterData.Count > 0)
                return responseData.WorkCenterData;
            return null;
        }

        public async Task<int> RecordScrap(RecordScrap requestData)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(recordscrap), requestData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            //RecordsIncidentResponseData responseData = JsonConvert.DeserializeObject<RecordsIncidentResponseData>(jsonString);
            response.EnsureSuccessStatusCode();
            //if (responseData != null && responseData.recordsIncidentsreponse.Count > 0)
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }
        public async Task<List<ProScrap>> getScrapItems(string workCenter)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            ProScrapRequest proScrap = new ProScrapRequest();
            proScrap.WorkCenter = workCenter;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getscrapitemsApi), proScrap).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            ScrapItemsResponseData responseData = JsonConvert.DeserializeObject<ScrapItemsResponseData>(jsonString);
            if (responseData != null && responseData.scrapitemsreponse != null && responseData.scrapitemsreponse.Count > 0)
                return responseData.scrapitemsreponse;
            return null;
        }


        public async Task<List<getUsers>> getAllUsers()
            {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsync(string.Format(getUserswithProdline), null).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            UserData responseData = JsonConvert.DeserializeObject<UserData>(jsonString);
            if (responseData != null && responseData.Users != null && responseData.Users.Count > 0)
                return responseData.Users;
            return null;
        }

        public async Task<int> AddUser(UserRequest user)
        {
            AddUser addUser = new AddUser();
            addUser.FirstName = user.FirstName;
            addUser.LastName = user.LastName;
            addUser.pIN = user.Pin;
            addUser.IsSuper = user.IsSuper;
            addUser.prodline = user.prodLine;
            addUser.roleId = user.roleId;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(addUserApi), addUser).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }

        public async Task<UserByIdResponse> GetUserById(int userId)
        {
            UserById user = new UserById();
            user.id = userId.ToString();
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(userbyidApi), user).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            UserByIdData responseData = JsonConvert.DeserializeObject<UserByIdData>(jsonString);
            if (responseData != null)
                    return responseData.UserById[0];
            return null;
        }
        public async Task<PrintOldLotResponse> GetLotTagsbyUniqueno(int uniqueno)
        {
            ReprintByUniqueno id = new ReprintByUniqueno();
            id.uniqueNo = uniqueno.ToString();
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getlottagbyno), id).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            printoldlogtagData responseData = JsonConvert.DeserializeObject<printoldlogtagData>(jsonString);
            if (responseData != null)
                return responseData.lottags[0];
            return null;
        }
        

        //public async Task<int> UpdateUser(UserRequest user)
        //{
        //    string bearerToken = await getBearerAccessToken();
        //    if (bearerToken == "") return 0;
        //    HttpClient requestHttpClient = new HttpClient();
        //    requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
        //    var patchDoc = new JsonPatchDocument<UserRequest>();
        //    patchDoc.Add(x => x.FirstName, user.FirstName);
        //    patchDoc.Add(x => x.LastName, user.LastName);
        //    patchDoc.Add(x => x.Pin, user.Pin);
        //    patchDoc.Add(x => x.IsActive, user.IsActive);
        //    patchDoc.Add(x => x.IsSuper, user.IsSuper);
        //    var serializedDoc = JsonConvert.SerializeObject(patchDoc);
        //    var requestContent = new StringContent(serializedDoc, Encoding.UTF8, "application/json-patch+json");
        //    //var response = await requestHttpClient.PatchAsync(UsersApi, requestContent);
        //    HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(UsersApi), user).Result;
        //    response.EnsureSuccessStatusCode();
        //    if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
        //        return 1;
        //    return 0;
        //}
        public async Task<UpdateUser> UpdateUser(UserRequest updateuser)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(updateUserApi), updateuser).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            UpdateUserResponse responseData = JsonConvert.DeserializeObject<UpdateUserResponse>(jsonString);
            if (responseData.UpdateUserdata != null && responseData.UpdateUserdata.Count > 0)
                return responseData.UpdateUserdata[0];
            return null;
        }
        public async Task<int> DeleteUser(int id)
        {
            UserLogin deleteuserid = new UserLogin();
            deleteuserid.Pin = id;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(UsersApi), deleteuserid).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }
        public async Task<int> CheckPin(UserLogin pin)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(checkPin), pin).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            CkeckPinResponseData responseData = JsonConvert.DeserializeObject<CkeckPinResponseData>(jsonString);
            if (responseData.CkeckPinData != null && responseData.CkeckPinData.Count > 0)
                return 0;
            return 1;
        }

        //getUserWiseProdlines
        //line controller
        //public async Task<int> reActivateLine(string lineId)
        //{
        //    string bearerToken = await getBearerAccessToken();
        //    if (bearerToken == "") return 0;
        //    HttpClient requestHttpClient = new HttpClient();
        //    requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
        //    //var response = await requestHttpClient.DeleteAsync(LinesApi + "?$filter = no eq " + lineId);
        //    var response = await requestHttpClient.DeleteAsync(LinesApi + "(" + lineId + ")");
        //    response.EnsureSuccessStatusCode();
        //    if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
        //        return 1;
        //    return 0;
        //}
        public async Task<int> reActivateLine(string lineId)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            LineRequest lineRequest = new LineRequest();
            lineRequest.lineID = lineId;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(reactiveApi), lineRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }
        public async Task<int> AddLine(string lineId)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            LineRequest lineRequest = new LineRequest();
            lineRequest.lineID = lineId;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(LinesApi), lineRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }

        public async Task<List<LineResponse>> getClosedLines()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(LinesApi)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            LineData responseData = JsonConvert.DeserializeObject<LineData>(jsonString);
            if (responseData != null && responseData.lineResponse.Count > 0)
                return responseData.lineResponse;
            return null;
        }

        public async Task<List<OpenLinesResponse>> getOpenLines(string workCenter)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            OpenLinesRequest openLinesRequest = new OpenLinesRequest();
            openLinesRequest.WorkCenter = workCenter;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(openLinesApi), openLinesRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            OpenLinesData responseData = JsonConvert.DeserializeObject<OpenLinesData>(jsonString);
            if (responseData != null && responseData.openLinesResponses != null && responseData.openLinesResponses.Count > 0)
                return responseData.openLinesResponses;
            return null;
        }

        public async Task<List<ShiftData>> GetShift(Shift shift)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            //OpenLinesRequest openLinesRequest = new OpenLinesRequest();
            //openLinesRequest.workCenter = workCenter;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getShiftApi), shift).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            ShiftsResponse responseData = JsonConvert.DeserializeObject<ShiftsResponse>(jsonString);
            if (responseData != null && responseData.shiftsResponse != null && responseData.shiftsResponse.Count > 0)
                return responseData.shiftsResponse;
            return null;
        }

        public async Task<List<LineActiveResponse>> isLineActive(string lineId)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            LineActiveRequest lineActiveRequest = new LineActiveRequest();
            lineActiveRequest.lineID = lineId;
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(isLineActiveApi), lineActiveRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            LineActiveData responseData = JsonConvert.DeserializeObject<LineActiveData>(jsonString);
            if (responseData != null && responseData.lineActiveResponses != null && responseData.lineActiveResponses.Count > 0)
                return responseData.lineActiveResponses;
            return null;
        }
        public async Task<int> EndProduction(EndProduction endProduction)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(endproductionApi), endProduction).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            if (!response.IsSuccessStatusCode)
            {
                return 0;
            }
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            EndProductionData responseData = JsonConvert.DeserializeObject<EndProductionData>(jsonString);
            if (responseData != null && responseData.EndProductionresponsedata != null && responseData.EndProductionresponsedata.Count > 0)
                return 1;
            return 0;
        }

        public async Task<List<GetLinesresponseData>> getLinesForWorkCenter(string workCenter)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            OpenLinesRequest openLinesRequest = new OpenLinesRequest();
            openLinesRequest.WorkCenter = workCenter;
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getLinesApi), openLinesRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            GetLineResponse responseData = JsonConvert.DeserializeObject<GetLineResponse>(jsonString);
            if (response != null && responseData.WorkCenterData != null && responseData.WorkCenterData.Count > 0)
                return responseData.WorkCenterData;
            return null;
        }

        public async Task<List<WorkCenterData>> getAllLines()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getalllinesApi)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            WorkCenterResponse responseData = JsonConvert.DeserializeObject<WorkCenterResponse>(jsonString);
            if (responseData.WorkCenterData != null && responseData.WorkCenterData.Count > 0)
                return responseData.WorkCenterData;
            return null;
        }

        public async Task<int> addBatchCaseData(LotTracked requestData)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(addbatchdata), requestData).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            Addbatchcaseresponsedata responseData = JsonConvert.DeserializeObject<Addbatchcaseresponsedata>(jsonString);
            if (response!=null && responseData != null && responseData.addbatchcasedata.Count > 0)
                return 1;
            return 0;
        }

        public async Task<List<LineResponse>> getclosedlinesData()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getclosedlines)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            LineResponseData responseData = JsonConvert.DeserializeObject<LineResponseData>(jsonString);
            if (responseData != null && responseData.LineResponse.Count > 0)
                return responseData.LineResponse;
            return null;
        }

        //public async Task<ProRepro> getUOM(string itemKey)
        //{
        //    string bearerToken = await getBearerAccessToken();
        //    if (bearerToken == "") return null;
        //    HttpClient requestHttpClient = new HttpClient();
        //    requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
        //    //HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getItemDetails + "?$filter = no eq " + itemKey)).Result;
        //    ItemKeyData itemKeyData = new ItemKeyData();
        //    itemKeyData.itemKey = itemKey;
        //    HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getItemDetailsApi), itemKeyData).Result;
        //    var jsonString = await response.Content.ReadAsStringAsync();
        //    ProRepro responseData = JsonConvert.DeserializeObject<ProRepro>(jsonString);
        //    if (responseData != null)
        //        return responseData;
        //    return null;
        //}



        public async Task<int> writeLog(WriteLog writeLog)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return 0;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(writeLogApi), writeLog).Result;
            response.EnsureSuccessStatusCode();
            if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
                return 1;
            return 0;
        }

        public async Task<LoginUserData> LoginUser(UserPin userLogin)
        {
            //userLogin.pin = "12345";
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(loginUserApi), userLogin).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            LoginUserResponse responseData = JsonConvert.DeserializeObject<LoginUserResponse>(jsonString);
            if (responseData != null && responseData.UserList != null && responseData.UserList.Count > 0)
                return responseData.UserList[0];
            return null;
        }
        //ProMasterstrip   APIURL
        public async Task<List<ItemNumberResponse>> GetPalletItems(string lineId)
        {
            PalletItemsRequest itemsRequest = new PalletItemsRequest();
            itemsRequest.lineID = lineId;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(getPalletItemsApi), itemsRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            PalletItemsResponse responseData = JsonConvert.DeserializeObject<PalletItemsResponse>(jsonString);
            if (responseData.ItemNumberData != null && responseData.ItemNumberData.Count > 0)
                return responseData.ItemNumberData;
            return null;
        }

        //GetPalletSize
        public async Task<List<PalletSizeResponse>> GetPalletSize(string itemKey)  //which value 
        {
            ItemKeyData item = new ItemKeyData();
            item.itemKey = itemKey;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(PalletSizeApi),item).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            PalletSizeResponseoData responseData = JsonConvert.DeserializeObject<PalletSizeResponseoData>(jsonString);
            //response.EnsureSuccessStatusCode();
            if (responseData != null && responseData.PalletSizeData != null && responseData.PalletSizeData.Count > 0)
                return responseData.PalletSizeData;
            return null;
        }
        //GetPalletCaseCount

        public async Task<int> SetPallet(ProPalletizationRequest proPalletization)
        {
            SetPalletRequest setPallet = new SetPalletRequest();
            setPallet.LineID = proPalletization.LineId;
            setPallet.ItemKey = proPalletization.ItemKey;
            setPallet.Qty = proPalletization.Qty;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(setpalletapi), setPallet).Result;
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            SetPalletResponseData responseData = JsonConvert.DeserializeObject<SetPalletResponseData>(jsonString);
            if (responseData != null && responseData.setpalletresponsedata != null && responseData.setpalletresponsedata.Count > 0)
                return 1;
            return 0;
        }

        public async Task<List<ProPalletizationResponse>> PrintLastPallet()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsync(string.Format(PrintLastPalletapi), null).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            PrintLastPalletResponse responseData = JsonConvert.DeserializeObject<PrintLastPalletResponse>(jsonString);
            if (responseData.printlastpalletData != null && responseData.printlastpalletData.Count > 0)
                return responseData.printlastpalletData;
            return null;
        }

        public async Task<int> MovePalletCases(ProPalletizationRequest proPalletization)
        {
            MovePalletCasesRequest movepallet = new MovePalletCasesRequest();
            movepallet.LineID = proPalletization.LineId;
            movepallet.ItemKey = proPalletization.ItemKey;
            movepallet.Qty = proPalletization.Qty;
            movepallet.NewLineID = proPalletization.NewLineId;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(movepalletcaseapi), movepallet).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            //response.EnsureSuccessStatusCode();
            MovePalletCasesResponseData responseData = JsonConvert.DeserializeObject<MovePalletCasesResponseData>(jsonString);
            if (responseData!=null && responseData.MovePalletCasesData != null && responseData.MovePalletCasesData.Count > 0)
                return 1;
            return 0;
        }

        public async Task<WriteExceptionResponse> WriteException(WriteExceptionRequest exceptionRequest)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(WriteExceptionApi), exceptionRequest).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            WriteExceptionResponseData responseData = JsonConvert.DeserializeObject<WriteExceptionResponseData>(jsonString);
            if (responseData.writeexceptiondata != null && responseData.writeexceptiondata.Count > 0)
                return responseData.writeexceptiondata[0];
            return null;
        }

        public async Task<List<ProPalletizationResponse>> PalletCasesReport() //responsedata
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsync(string.Format(palletcasereportapi), null).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            PrintLastPalletResponse responseData = JsonConvert.DeserializeObject<PrintLastPalletResponse>(jsonString);
            if (responseData.printlastpalletData != null && responseData.printlastpalletData.Count > 0)
                return responseData.printlastpalletData;
            return null;
        }
        //proMasterStrip

        public async Task<List<MSLotNumberResponse>> GetMSLotNumber()  //which value 
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsync(string.Format(MsLotNumberApi), null).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            GetProMSlotNoData responseData = JsonConvert.DeserializeObject<GetProMSlotNoData>(jsonString);
            //response.EnsureSuccessStatusCode();
            if (responseData.ProMSlotNoData != null && responseData.ProMSlotNoData.Count > 0)
                return responseData.ProMSlotNoData;
            return null;
        }

        #region Code By Parasar     

        #region Record Production
        public async Task<RecordProductionResponse> RecordProduction(RecordProduction recordProduction)
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(recordproduction), recordProduction).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            RecordProductionData responseData = JsonConvert.DeserializeObject<RecordProductionData>(jsonString);
            if (responseData != null && responseData.RecordProductiondata != null && responseData.RecordProductiondata.Count > 0)
                return responseData.RecordProductiondata[0];
            return null;
        }
        #endregion

        #region Old record production api code 
        //public async Task<int> RecordProduction(RecordProduction recordProduction)
        //{
        //    string bearerToken = await getBearerAccessToken();
        //    if (bearerToken == "") return -1;
        //    HttpClient requestHttpClient = new HttpClient();
        //    requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
        //    HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(recordproduction), recordProduction).Result;
        //    var jsonString = await response.Content.ReadAsStringAsync();
        //    //response.EnsureSuccessStatusCode();
        //    //if (response.EnsureSuccessStatusCode().IsSuccessStatusCode)
        //    //    return 1;
        //    //return 0;
        //    jsonString = jsonString.Replace(@"\", "").Replace("\"[", "[").Replace("]\"", "]"); ;
        //    RecordProductionData responseData = JsonConvert.DeserializeObject<RecordProductionData>(jsonString);
        //    if (responseData != null && responseData.RecordProductiondata.Count > 0)
        //        return responseData.RecordProductiondata;
        //    return null;
        //}
        #endregion

        #region GetPalletCaseCount
        public async Task<int> GetPalletCaseCount(ProPalletizationRequest palletCaseCount)
        {
            GetPalletCaseCountRequest PalletCaseCount = new GetPalletCaseCountRequest();
            PalletCaseCount.lineID = palletCaseCount.LineId;
            PalletCaseCount.itemKey = palletCaseCount.ItemKey;
            PalletCaseCount.lotNumber = palletCaseCount.LotNumber;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return -1;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(GetPalletCaseCountApi), PalletCaseCount).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            GetPalletCaseCountData responseData = JsonConvert.DeserializeObject<GetPalletCaseCountData>(jsonString);
            if (responseData.PalletCaseCountdata != null && responseData.PalletCaseCountdata.Count > 0)
                return responseData.PalletCaseCountdata[0].Count;
            return 0;
        }
        #endregion

        #region GetUserWiseProdLines
        public async Task<List<ProdLines?>> GetUserWiseProdLines(int userID)
        {
            GetUserWiseProdlineReq getUserWiseProdlineReq = new GetUserWiseProdlineReq();
            getUserWiseProdlineReq.userId = userID;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(GetUserWiseProdlinesAPI), getUserWiseProdlineReq).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            GetUserWiseProdlinesData responseData = JsonConvert.DeserializeObject<GetUserWiseProdlinesData>(jsonString);
            if (responseData != null && responseData.UserWiseProdlinesData != null && responseData.UserWiseProdlinesData.Count > 0)
                return responseData.UserWiseProdlinesData;
            return null;
        }
        #endregion

        #region GetProdLine
        public async Task<List<ProdLines?>> GetProdLine()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(GetProdLineAPI)).Result; //change API after you get
            var jsonString = await response.Content.ReadAsStringAsync();
            //jsonString = jsonString.Replace(@"\", "").Replace(@"""[", "[").Replace(@"}]""}", "}]}").Replace(@"]""", "]");
            GetProdlinesData responseData = JsonConvert.DeserializeObject<GetProdlinesData>(jsonString);
            if (responseData != null && responseData.ProdlinesData != null && responseData.ProdlinesData.Count > 0)
                return responseData.ProdlinesData;
            return null;
        }
        #endregion

        #endregion
        #region GetProMRLotNumber 
        public async Task<List<GetProMRLotNoResponse>> GetMRLotNumber(string lineId)
        {
            GetProMRLotNo line = new GetProMRLotNo();
            line.lineID = lineId;
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.PostAsJsonAsync(string.Format(MRLotNumberApi), line).Result; // Change API with original API for GetMRLot number data
            var jsonString = await response.Content.ReadAsStringAsync();
            jsonString = jsonString.Replace(@"\", "").Replace(@"""{", "[{").Replace(@"}""", "}]");
            GetProMRlotNoData responseData = JsonConvert.DeserializeObject<GetProMRlotNoData>(jsonString);
            if (responseData != null && responseData.ProMRlotNoData != null && responseData.ProMRlotNoData.Count > 0)
                return responseData.ProMRlotNoData;
            return null;
        }
        #endregion
        public async Task<List<PrintOldLotResponse>> getprintoldlogtag()
        {
            string bearerToken = await getBearerAccessToken();
            if (bearerToken == "") return null;
            HttpClient requestHttpClient = new HttpClient();
            requestHttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearerToken);
            HttpResponseMessage response = requestHttpClient.GetAsync(string.Format(getalltaglist)).Result;
            var jsonString = await response.Content.ReadAsStringAsync();
            printoldlogtagData responseData = JsonConvert.DeserializeObject<printoldlogtagData>(jsonString);
            if (responseData != null && responseData.lottags != null && responseData.lottags.Count > 0)
                return responseData.lottags;
            return null;
        }
    }
}
