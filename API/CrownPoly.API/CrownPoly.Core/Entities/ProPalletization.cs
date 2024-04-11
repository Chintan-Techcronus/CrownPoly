using Newtonsoft.Json;

namespace CrownPoly.Core.Entities
{
    public class ProPalletizationRequest
    {
        public string LineId { get; set; } = string.Empty;
        public string ItemKey { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        public string Qty { get; set; } = string.Empty;
        public string NewLineId { get; set; } = string.Empty;
    }

    public class ProPalletizationResponse
    {
        public string LineNumber { get; set; } = string.Empty;
        public string ItemNumber { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        public string CaseCount { get; set; } = string.Empty;
        public string UniqueNo { get; set; } = string.Empty;
    }

    public class ItemNumberResponse
    {
        public string ItemNumber { get; set; } = string.Empty;
    }

    public class PalletItemsRequest
    {
        public string lineID { get; set; } = string.Empty;
    }

    public class SetPalletRequest
    {
        public string LineID { get; set; } = string.Empty;
        public string ItemKey { get; set; } = string.Empty;
        public string Qty { get; set; } = string.Empty;
    }
    public class SetPalletResponse
    {
        public string LineNumber { get; set; } = string.Empty;
        public string ItemNumber { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        public int CaseCount { get; set; }
    }
    public class MovePalletCasesRequest
    {
        public string LineID { get; set; } = string.Empty;
        public string ItemKey { get; set; } = string.Empty;
        public string Qty { get; set; } = string.Empty;
        public string NewLineID { get; set; } = string.Empty;
    }
    public class MovePalletCasesResponse
    {
        public int CaseID { get; set; } 
        public string LineNumber { get; set; } = string.Empty;
    }
    public class PalletCasesReportResponse
    {
        public string LineNumber { get; set; } = string.Empty;
        public string ItemNumber { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        public string CaseCount { get; set; } = string.Empty;
        public string UniqueNo { get; set; } = string.Empty;
    }

    public class WriteExceptionRequest
    {
        public string exceptionType { get; set; } = string.Empty;
        public string exceptionData { get; set; } = string.Empty;
        public int superID { get; set; }
    }

    public class WriteExceptionResponse
    {
        public string ExceptionType { get; set; } = string.Empty;
        public string ExceptionData { get; set; } = string.Empty;
        public int SuperID { get; set; }
        public DateTime RecordDate { get; set; }
    }

    public class PrintOldLotResponse
    {
        public string LineNumber { get; set; } = string.Empty;
        public string ItemNumber { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        //public string CaseCount { get; set; } = string.Empty;
        public string UniqueNo { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }

    #region
    public class GetPalletCaseCountRequest
    {
        public string lineID { get; set; } = string.Empty;
        public string itemKey { get; set; } = string.Empty;
        public string lotNumber { get; set; } = string.Empty;
    }

    public class GetPalletCaseCountResponse
    {
        public int Count { get; set; } = 0;
    }

    public class PalletSizeResponse
    {
        [JsonProperty("Case Count")]
        public int CaseCount { get; set; } = 0;
    }
    #endregion
}