using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrownPoly.Core.Entities
{
    public class ProHsRequest
    {
        public string lineNo { get; set; } = string.Empty;
        public string lotTrackedNumber { get; set; } = string.Empty;
        public string lineID { get; set; } = string.Empty;
        //  public DateTime ProdDate { get; set; }
        public string ProdDate { get; set; }
        public string Shift { get; set; }
        public string mLotNo { get; set; }
        public string ItemNo { get; set; }
        public string ItemNum { get; set; }
        //prodnum
        public string ProdNum { get; set; }
        public int Qty { get; set; }
    }

    public class ProdctionNum
    {
        public string ProdNum { get; set; }
    }
    public class ItemKey
    {
        [Column("item No_")]
        public string ItemNo_ { get; set; }
    }

    public class ProHsResponse
    {
        //countcase
        public int CasesOnPallet { get; set; }
        public int CasesProduced { get; set; }
        public float Finished { get; set; }
        public float Remaining { get; set; }
        public IEnumerable<ProdCases> ProdCases { get; set; }
    }

    public class ProdCases
    {
        public float Finished { get; set; }
        public float Remainig { get; set; }
    }

    public class AddBatchcase
    {
        [JsonProperty("lineID")]
        public string lineID { get; set; }

        [JsonProperty("prodDate")]
        public string prodDate { get; set; }

        [JsonProperty("shift")]
        public string shift { get; set; }

        [JsonProperty("lotNo")]
        public string lotNo { get; set; }

        [JsonProperty("prodOrderNo")]
        public string prodOrderNo { get; set; }

        //[JsonProperty("Qty")]
        //public string? qty { get; set; } // Nullable string
    }

    public class ProHsRequestNew
    {
        public string lineNo { get; set; } = string.Empty;
        public string lotTrackedNumber { get; set; } = string.Empty;
        public string lineID { get; set; } = string.Empty;
        //  public DateTime ProdDate { get; set; }
        public string ProdDate { get; set; }
        public string Shift { get; set; }
        public string mLotNo { get; set; }
        public string ItemNo { get; set; }
        public string ItemNum { get; set; }
        //prodnum
        public string ProdNum { get; set; }
        public decimal Qty { get; set; }
    }

    public class LotTrackedResponse
    {
        [JsonProperty("No.")]
        public string No { get; set; }
    }
}