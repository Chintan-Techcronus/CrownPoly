using Newtonsoft.Json;

namespace CrownPoly.Core.Entities
{
    public class LineRequest
    {
        public string lineID { get; set; }
    }
    public class LineResponseData
    {
        [JsonProperty("value")]
        public List<LineResponse> LineResponse { get; set; }
    }
    public class LineResponse
    {
        [JsonProperty("no")]
        public string lineId { get; set; } = string.Empty;
        public string systemid { get; set; } = string.Empty;
    }

    public class Shift
    {
        public string ProdDate { get; set; } = string.Empty;
        public string ShiftAMPM { get; set; } = string.Empty;
 
    }
    public class ShiftData 
    {
        [JsonProperty("Shift")]
        public string Shift { get; set; } = string.Empty;
    }

    public class EndProduction
    {
        [JsonProperty("lineID")]
        public string lineID { get; set; } = string.Empty;
        
        [JsonProperty("workCenter")]
        public string workCenter { get; set; } = string.Empty;
    }

    public class WriteLog
    {
        [JsonProperty("userID")]
        public string userID { get; set; } = string.Empty;
        public string logIn { get; set; } = string.Empty;
        public string logOut { get; set; } = string.Empty;
        public string prodDate { get; set; } = string.Empty;
        public string line { get; set; } = string.Empty;
        public string shift { get; set; } = string.Empty;
    }
}