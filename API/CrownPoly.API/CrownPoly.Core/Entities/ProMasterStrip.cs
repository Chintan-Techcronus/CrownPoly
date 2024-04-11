using Newtonsoft.Json;

namespace CrownPoly.Core.Entities
{
    public class ProMasterStrip
    {
        public string lineNo { get; set; } = string.Empty;
    }

    public class ProductWorkOrders
    {
        public string ProdNum { get; set; } = string.Empty;
        public string ItemNum { get; set; } = string.Empty;
    }
    public class CoreTypesarea
    {
        [JsonProperty("typearea")]
        public string TypeArea { get; set; } = string.Empty;
    }
    public class CoreTypes
    {
        [JsonProperty("TypeDesc")]
        public string TypeDesc { get; set; } = string.Empty;

        [JsonProperty("Weight")]
        public decimal? Weight { get; set; }
    }

    public class RecordProduction
    {
        [JsonProperty("prodDate")]
        public string ProdDate { get; set; } = string.Empty;

        [JsonProperty("shift")]
        public string Shift { get; set; } = string.Empty;

        [JsonProperty("lineID")]
        public string LineID { get; set; } = string.Empty;

        [JsonProperty("prodNum")]
        public string ProdNum { get; set; } = string.Empty;

        [JsonProperty("qty")]
        public int Qty { get; set; } 

        [JsonProperty("uOM")]
        public string uOM { get; set; } = string.Empty;

        [JsonProperty("workCenter")]
        public string WorkCenter { get; set; } = string.Empty;

        [JsonProperty("lotNumber")]
        public string LotNumber { get; set; } = string.Empty;
    }

    public class MSLotNumberResponse
    {
        public int MSLotNumber { get; set; } 
    }

    #region Code by Parasar

    public class RecordProductionResponse
    {
        [JsonProperty("Line No.")]
        public int lineNumber { get; set; }

        [JsonProperty("Item No.")]
        public string ItemNumber { get; set; } = string.Empty;

        [JsonProperty("Posting Date")]
        public DateTime PostDate { get; set; }

        [JsonProperty("Order No.")]
        public string OrderNumber { get; set; } = string.Empty;

        [JsonProperty("Document No.")]
        public string DocumentNo { get; set; } = string.Empty;

        [JsonProperty("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("Operation No.")]
        public string OperationNo { get; set; } = string.Empty;

        [JsonProperty("No.")]
        public string No { get; set; } = string.Empty;

        [JsonProperty("Unit Of Measure")]
        public string UOM { get; set; } = string.Empty;

        [JsonProperty("Type")]
        public int Type { get; set; }

        [JsonProperty("Shift")]
        public string Shift { get; set; } = string.Empty;

        [JsonProperty("Lot No.")]
        public string LotNo { get; set; } = string.Empty;

        [JsonProperty("Item Category Code")]
        public string ItemCatCode { get; set; } = string.Empty;

        [JsonProperty("Validated")]
        public bool Validated { get; set; }
    }

    #endregion
}