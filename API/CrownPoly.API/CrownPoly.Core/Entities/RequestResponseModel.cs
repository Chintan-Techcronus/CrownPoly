using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrownPoly.Core.Entities
{
    public class GetItemKey2Request
    {
        public string lotNumber { get; set; } = string.Empty;
    }
    public class GetItemKey2Response
    {
        [JsonProperty("Item No.")]
        public string itemNo { get; set; } = string.Empty;
    }
    public class GetItemKey2Data
    {
        [JsonProperty("value")]
        public List<GetItemKey2Response> getItemKey2Responses { get; set; }
    }

    public class GetItemKeyRequest
    {
        public string prodNum { get; set; }
    }
    public class GetItemKeyResponse
    {
        [JsonProperty("Prod. Order No.")]
        public string prodOrderNo { get; set; }

        [JsonProperty("ItemNo")]
        public string itemNo { get; set; }
    }
    public class GetItemKeyData
    {
        [JsonProperty("value")]
        public List<GetItemKeyResponse> getItemKeyResponses { get; set; }
    }

    public class OpenLinesRequest
    {
        public string WorkCenter { get; set; }
    }
    public class OpenLinesResponse
    {
        [JsonProperty("No.")]
        public string No { get; set; } = string.Empty;
    }
    public class OpenLinesData
    {
        [JsonProperty("value")]
        public List<OpenLinesResponse> openLinesResponses { get; set; }
    }
    public class ShiftsRequest
    {
        [JsonProperty("value")]
        public List<Shift> shiftsResponse { get; set; }
    }
    public class ShiftsResponse
    {
        [JsonProperty("value")]
        public List<ShiftData> shiftsResponse { get; set; }
    }

    public class CasesProducedRequest
    {
        public string prodDate { get; set; } = string.Empty;
        public string shift { get; set; } = string.Empty;
        public string lineID { get; set; } = string.Empty;
    }
    public class ProdCaseRequest
    {
        public string prodNum { get; set; } = string.Empty;
    }
    public class ProdCaseData
    {
        [JsonProperty("value")]
        public List<ProdCases> ProdCaseDataResponses { get; set; }
    }
    public class CasesProducedResponse
    {
        public string Qty { get; set; }
    }

    public class CasesOnPalletResponseData
    {
        [JsonProperty("value")]
        public List<CasesOnPalletResponse> casesonpalletresponse { get; set; }
    }

    public class CasesOnPalletRequest
    {
        public string lineID { get; set; } = string.Empty;
    }
    public class CasesOnPalletResponse
    {
        public string CaseID { get; set; }
    }

    public class CasesProducedData
    {
        [JsonProperty("value")]
        public List<CasesProducedResponse> casesProducedResponses { get; set; }
    }

    public class LineActiveRequest
    {
        [JsonProperty("no")]
        public string lineID { get; set; }
    }
    public class LineActiveResponse
    {
        [JsonProperty("No.")]
        public string No { get; set; }
    }

    public class LineActiveData
    {
        [JsonProperty("value")]
        public List<LineActiveResponse> lineActiveResponses { get; set; }
    }

    public class RecordConsumptionRequest
    {
        public string prodDate { get; set; } = string.Empty;
        public string prodNum { get; set; } = string.Empty;
        public string lotNumber { get; set; } = string.Empty;
        public decimal qty { get; set; }
        public string lineID { get; set; } = string.Empty;
        public string itemKey { get; set; } = string.Empty;
        public string shift { get; set; } = string.Empty;
    }

    public class RecordConsumptionResponse
    {
        [JsonProperty("Journal Template Name")]
        public string journalTemplateName { get; set; }

        [JsonProperty("Journal Batch Name")]
        public string journalBatchName { get; set; }

        [JsonProperty("Line No.")]
        public string lineNo { get; set; }

        [JsonProperty("Posting Date")]
        public string postingDate { get; set; }

        [JsonProperty("Production Order No")]
        public string productionOrderNo { get; set; }

        [JsonProperty("Document No.")]
        public string documentNo { get; set; }

        [JsonProperty("Lot No.")]
        public string lotNo { get; set; }

        [JsonProperty("Item No.")]
        public string itemNo { get; set; }

        [JsonProperty("Quantity")]
        public string quantity { get; set; }

        [JsonProperty("Unit Of Measure Code")]
        public string unitOfMeasureCode { get; set; }

        [JsonProperty("Machine Center Code")]
        public string machineCenterCode { get; set; }

        [JsonProperty("Completed")]
        public string Completed { get; set; }

        [JsonProperty("Validated")]
        public string Validated { get; set; }

        [JsonProperty("Division Item Category")]
        public string divisionItemCategory { get; set; }

        [JsonProperty("Location Code")]
        public string locationCode { get; set; }

        [JsonProperty("Shift")]
        public string Shift { get; set; }
    }

    public class RecordConsumptionData
    {
        [JsonProperty("value")]
        public List<RecordConsumptionResponse> recordConsumptionResponses { get; set; }
    }

    public class ProblemDescRequest
    {
        public string problemCode { get; set; }
    }

    public class ProblemDescResponse
    {
        [JsonProperty("Default Description")]
        public string defaultDescription { get; set; } = string.Empty;
    }

    public class ProblemDescData
    {
        [JsonProperty("value")]
        public List<ProblemDescResponse> problemDescResponses { get; set; }
    }

    public class ItemKeyData
    {
        public string itemKey { get; set; } = string.Empty;
    }

    public class CheckLotRequest
    {
        public string lotNumber { get; set; }
    }
    public class CheckLotResponse
    {
        public string RemQty { get; set; }

    }
    public class CheckLotData
    {
        [JsonProperty("value")]
        public List<CheckLotResponse> checkLotData { get; set; }
    }

    public class OrderDDLResponse
    {
        [JsonProperty("value")]
        public List<OrderDDLData> orderDDLData { get; set; }
    }

    public class OrderDDLData
    {
        [JsonProperty("Prod. Order No.")]
        public string ProdNum { get; set; } = string.Empty;

        [JsonProperty("Item No.")]
        public string ItemNum { get; set; } = string.Empty;
    }

    public class ProdOrderOpen
    {
        public string ProdNum { get; set; }
    }

    public class LoginUserData
    {
        [JsonProperty("UserID")]
        public string UserID { get; set; }
        [JsonProperty("UserName")]
        public string UserName { get; set; }
        public User User { get; set; }
        public int Pin { get; set; }
        public int Id { get; set; }
        public List<ProdLines?> ProdLines { get; set; }
        [JsonProperty("firstname")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty("lastname")]
        public string LastName { get; set; } = string.Empty;
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
    }
    public class LoginUserResponse
    {
        [JsonProperty("value")]
        public List<LoginUserData> UserList { get; set; }
    }

    public class UserPin
    {
        public string pin { get; set; }
    }

    public class ItemData
    {
        [JsonProperty("value")]
        public List<CrownPolyItem> Items { get; set; }
    }

    public class UserData
    {
        [JsonProperty("value")]
        public List<getUsers> Users { get; set; }
        //public List<UserResponse> Users { get; set; }
    }
    public class UserByIdData
    {
        [JsonProperty("value")]
        public List<UserByIdResponse> UserById { get; set; }
        //public List<UserResponse> Users { get; set; }
    }

    public class WorkCenterResponse
    {
        [JsonProperty("value")]
        public List<WorkCenterData> WorkCenterData { get; set; }
    }
    public class GetLineResponse
    {
        [JsonProperty("value")]
        public List<GetLinesresponseData> WorkCenterData { get; set; }
    }

    public class PalletItemsResponse
    {
        [JsonProperty("value")]
        public List<ItemNumberResponse> ItemNumberData { get; set; }
    }

    public class PrintLastPalletResponse
    {
        [JsonProperty("value")]
        public List<ProPalletizationResponse> printlastpalletData { get; set; }
    }
    public class WriteExceptionResponseData
    {
        [JsonProperty("value")]
        public List<WriteExceptionResponse> writeexceptiondata { get; set; }
    }
    
    public class WorkCenterData
    {
        [JsonProperty("no")]
        public string No { get; set; }
    }
    public class GetLinesresponseData
    {
        [JsonProperty("No.")]
        public string No { get; set; }
    }
    public class UpdateUserResponse
    {
        public List<UpdateUser> UpdateUserdata { get; set; }
    }
    
    public class UserResponse
    {
        [JsonProperty("userid")]
        public string Id { get; set; }

        [JsonProperty("firstname")]
        public string FirstName { get; set; }

        [JsonProperty("lastname")]
        public string LastName { get; set; }

        [JsonProperty("pin")]
        public string Pin { get; set; }

        [JsonProperty("issuper")]
        public string IsSuper { get; set; }

        [JsonProperty("isactive")]
        public string IsActive { get; set; }
        public List<ProdLines?> ProdLines { get; set; }
    }
    public class RequestResponseModel
    {
        [JsonProperty("value")]
        public List<CrownPolyItem> Items { get; set; }
    }
    public class ProReproLotNoResponseData
    {
        [JsonProperty("value")]
        public List<lotstartdata> reprolotnoresponse { get; set; }
    }
    public class lotstartdata
    {
        public string LotStart { get; set; }
    }

    public class ProReproData
    {
        [JsonProperty("value")]
        public List<ProRepro> Items { get; set; }
    }

    public class ProReproUomresponseData
    {
        [JsonProperty("value")]
        public List<UOMData> ProReproUomresponse { get; set; }
    }

    public class IncidentData
    {
        [JsonProperty("value")]
        public List<Incident> incidentresponse { get; set; }
    }

    public class RecordsIncidentResponseData
    {
        [JsonProperty("value")]
        public List<RecordsIncidentResponse> recordsIncidentsreponse { get; set; }
    }
    public class StopTimeResponseData
    {
        [JsonProperty("value")]
        public List<StopTime> stoptimereponse { get; set; }
    }
    
    public class ScrapItemsResponseData
    {
        [JsonProperty("value")]
        public List<ProScrap> scrapitemsreponse { get; set; }
    }

    public class CkeckPinResponseData
    {
        [JsonProperty("value")]
        public List<UserLogin> CkeckPinData { get; set; }
    }



    public class LineData
    {
        [JsonProperty("value")]
        public List<LineResponse> lineResponse { get; set; }
    }

    public class ProblemAreaData
    {
        [JsonProperty("value")]
        public List<ProblemAreas> Items { get; set; }
    }

    public class CoreTypesData
    {
        [JsonProperty("value")]
        public List<CoreTypes> Items { get; set; }
    }

    public class CrownPolyItem
    {
        //public string baseUnitofMeasure { get; set; }
        //public string no { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("Bag Dimensions")]
        [Column("Bag Dimensions")]
        public string BagDim { get; set; }

        [JsonProperty("Film Gauge")]
        [Column("Film Gauge")]
        public decimal Gauge { get; set; }

        //public int Glue { get; set; }

        [JsonProperty("Bags per Roll_Bundle")]
        [Column("Bags per Roll_Bundle")]
        public int BagsRoll { get; set; }

        [JsonProperty("Rolls_Bundles per Case")]
        [Column("Rolls_Bundles per Case")]
        public int RollsCase { get; set; }

        //[JsonProperty("caseCount")]
        //public int CaseCount { get; set; }
    }

    #region Code by Parasar
    public class RecordProductionData
    {
        [JsonProperty("value")]
        public List<RecordProductionResponse> RecordProductiondata { get; set; }
    }

    public class GetPalletCaseCountData
    {
        [JsonProperty("value")]
        public List<GetPalletCaseCountResponse> PalletCaseCountdata { get; set; }
    }

    public class GetUserWiseProdlinesData
    {
        [JsonProperty("value")]
        public List<ProdLines> UserWiseProdlinesData { get; set; }
        //public List<UserResponse> Users { get; set; }
    }

    public class GetProdlinesData
    {
        [JsonProperty("value")]
        public List<ProdLines> ProdlinesData { get; set; }
        //public List<UserResponse> Users { get; set; }
    }
    #endregion
    public class GetProMRlotNoData
    {
        [JsonProperty("value")]
        public List<GetProMRLotNoResponse> ProMRlotNoData { get; set; }
    }

    public class GetProMSlotNoData
    {
        [JsonProperty("value")]
        public List<MSLotNumberResponse> ProMSlotNoData { get; set; }
    }

    public class PalletSizeResponseoData
    {
        [JsonProperty("value")]
        public List<PalletSizeResponse> PalletSizeData { get; set; }
    }

    public class MovePalletCasesResponseData
    {
        [JsonProperty("value")]
        public List<MovePalletCasesResponse> MovePalletCasesData { get; set; }

    }
    public class LotTrackedresponsedata
    {
        [JsonProperty("value")]
        public List<LotTrackedresponse> LotTrackedData { get; set; }
    }

    public class Addbatchcaseresponsedata
    {
        [JsonProperty("value")]
        public List<Addbatchcaseresponse> addbatchcasedata { get; set; }
    }

    public class Addbatchcaseresponse
    {

        //[JsonProperty("LineID")]
        //public string LineID { get; set; }

        //[JsonProperty("ProdDate")]
        //public string ProdDate { get; set; }

        //[JsonProperty("Shift")]
        //public string Shift { get; set; }

        //[JsonProperty("LotNo")]
        //public string LotNo { get; set; }

        //[JsonProperty("prodOrderNo")]
        //public string ProdOrderNo { get; set; }

        public int Qty { get; set; }
    }
    public class EndProductionData
    {
        [JsonProperty("value")]
        public List<EndProductionresponse> EndProductionresponsedata { get; set; }
    }

    public class EndProductionresponse
    {
        [JsonProperty("ProdDate")]
        public string ProdDate { get; set; }

        [JsonProperty("Shift")]
        public string Shift { get; set; }

        [JsonProperty("ProdOrderNo")]
        public string ProdOrderNo { get; set; }

        [JsonProperty("LotNo")]
        public string LotNo { get; set; }

        [JsonProperty("Qty")]
        public string Qty { get; set; }

        [JsonProperty("Posted")]
        public bool Posted { get; set; }
    }
    public class SetPalletResponseData
    {
        [JsonProperty("value")]
        public List<SetPalletResponse> setpalletresponsedata { get; set; }
    }

    public class LotTrackedResponseData
    {
        [JsonProperty("value")]
        public List<LotTrackedResponse> lottrackedresponsedata { get; set; }
    }
    public class RecordScrapResponseData
    {
        [JsonProperty("value")]
        public List<RecordScrapResponse> recordscrapresponsedata { get; set; }
    }
    public class printoldlogtagData
    {
        [JsonProperty("value")]
        public List<PrintOldLotResponse> lottags { get; set; }
    }
}