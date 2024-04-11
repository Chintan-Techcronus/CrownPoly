using Newtonsoft.Json;
using System.Runtime.InteropServices;
namespace CrownPoly.Core.Entities
{
    public class ProScrap
    {
        [JsonProperty("No.")]
        public string No_ { get; set; } = string.Empty;
    }

    public class ProScrapRequest
    {
        public string WorkCenter { get; set; } = string.Empty;
    }

    public class RecordScrap
    {
        public string ProdDate { get; set; } = string.Empty;
        public string Shift { get; set; } = string.Empty;
        public string LineID { get; set; } = string.Empty;
  
        [JsonProperty("ItemKey")]
        public string ItemKey { get; set; } = string.Empty;
        public int Qty { get; set; } 
    }

    public class RecordScrapResponse
    {
        [JsonProperty("Journal Template Name")]
        public string JournalTemplateName { get; set; } = string.Empty;

        [JsonProperty("Journal Batch Name")]
        public string JournalBatchName { get; set; } = string.Empty;

        [JsonProperty("Line No,")]
        public int LineNo { get; set; }

        [JsonProperty("Item No.")]
        public string ItemNo { get; set; } = string.Empty;

        [JsonProperty("Posting Date")]
        public DateTime PostingDate { get; set; }

        [JsonProperty("Machine Center Code")]
        public string MachineCenterCode { get; set; } = string.Empty;

        [JsonProperty("Quantity")]
        public decimal Quantity { get; set; }

        [JsonProperty("Unit of Measure Code")]
        public string UnitofMeasureCode { get; set; } = string.Empty;

        [JsonProperty("Entry Type")]
        public int EntryType { get; set; }

        [JsonProperty("Shift")]
        public string Shift { get; set; } = string.Empty;

        [JsonProperty("Location Code")]
        public string LocationCode { get; set; } = string.Empty;

        [JsonProperty("Document No.")]
        public string DocumentNo { get; set; } = string.Empty;

        [JsonProperty("Decription")]
        public string Decription { get; set; } = string.Empty;

        [JsonProperty("Completed")]
        public bool Completed { get; set; }
        [JsonProperty("Validated")]
        public bool Validated { get; set; }

        [JsonProperty("Lot No.")]
        public string LotNo { get; set; } = string.Empty;

        [JsonProperty("Division Item Category")]
        public string DivisionItemCategory { get; set; } = string.Empty;

    }
}