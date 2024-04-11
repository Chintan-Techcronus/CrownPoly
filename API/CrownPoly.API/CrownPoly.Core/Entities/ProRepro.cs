using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Core.Entities
{
    public class ProRepro
    {
        public string ProdDate { get; set; } = string.Empty;
        public string Shift { get; set; } = string.Empty;
        public string LotNo { get; set; } = string.Empty;

        [JsonProperty("Base Unit of Measure")]
        public string Uom { get; set; } = string.Empty;

        public string ItemKey { get; set; } = string.Empty;
    }

    public class ReproLot
    {
        public string lotStart { get; set; } = string.Empty;
    }

    public class UOMData
    {
        [JsonProperty("Base Unit of Measure")]
        public string Uom { get; set; } = string.Empty;
    }
}
