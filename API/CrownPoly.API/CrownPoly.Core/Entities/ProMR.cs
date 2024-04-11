using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Core.Entities
{
    public class GetProMRLotNo
    {
        public string lineID { get; set; } = string.Empty;
    }

    public class GetProMRLotNoReq
    {
        public string lineId { get; set; } = string.Empty;
    }

    public class GetProMRLotNoResponse
    {
        public string MRLotNumber { get; set; } = string.Empty;
    }
}
