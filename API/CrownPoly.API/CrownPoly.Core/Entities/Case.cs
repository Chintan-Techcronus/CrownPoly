using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Core.Entities
{
    public class CaseRequest
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Shift { get; set; } = string.Empty;
        public int Line { get; set; }
        public int Order { get; set; }
        public int Quantity { get; set; }
    }
    public class LinesDDL
    {
        public string lineID { get; set; }
    }

    public class OrderDDL
    {
        public string ProdNum { get; set; } = string.Empty;
        public int ItemNum { get; set; }
    }

    public class OrderList
    {
        public string Order { get; set; } = string.Empty;
    }

    public class LotTracked
    {
        [JsonProperty("prodorderno")]
        public string prodOrderNo { get; set; } = string.Empty;

        [JsonProperty("proddate")]
        public string prodDate { get; set; } = string.Empty;

        [JsonProperty("lineid")]
        public string lineID { get; set; } = string.Empty;

        [JsonProperty("shift")]
        public string shift { get; set; } = string.Empty;

        [JsonProperty("lotno")]
        public string lotNo { get; set; } = string.Empty;
    }

    public class Getlottracked
    {
        [JsonProperty("prodorderno")]
        public string prodorderno { get; set; } = string.Empty;

        [JsonProperty("proddate")]
        public string proddate { get; set; } = string.Empty;

        [JsonProperty("lineid")]
        public string lineid { get; set; } = string.Empty;

        [JsonProperty("shift")]
        public string shift { get; set; } = string.Empty;

    }
    public class LotTrackedresponse
    {
        [JsonProperty("No.")]
        public string No { get; set; } = string.Empty;
    }

}