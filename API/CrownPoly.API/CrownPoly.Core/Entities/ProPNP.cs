using Newtonsoft.Json;
using System.Xml.Linq;

namespace CrownPoly.Core.Entities
{
    public class ProPNP
    {
    }

    public class Incident
    {
        public string IncidentCode { get; set; }

        public string IncidentName { get; set; }

        public string DefaultDescription { get; set; }

    }

    public class RecordsIncidents
    {
        [JsonProperty("prodDate")]
        public string ProdDate { get; set; }

        [JsonProperty("shift")]
        public string Shift { get; set; }

        [JsonProperty("lineID")]
        public string lineID { get; set; }

        [JsonProperty("probelmArea")]
        public string ProbelmArea { get; set; }

        [JsonProperty("incidentCode")]
        public string IncidentCode { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("startTime")]
        public string StartTime { get; set; }

        [JsonProperty("endTime")]
        public string EndTime { get; set; }

        [JsonProperty("lineClean")]
        public bool lineClean { get; set; } = false;
    }

    public class ProblemAreas
    {
        [JsonProperty("areaid")]
        public string areaid { get; set; }

        [JsonProperty("problemarea")]
        public string problemArea { get; set; }

    }

    public class workcenterdata
    {
        public string workCenter { get; set; }
    }

    public class RecordsIncidentResponse
    {
        [JsonProperty("Posting Date")]
        public string ProdDate { get; set; }

        [JsonProperty("Shift")]
        public string Shift { get; set; }

        [JsonProperty("Machine Center")]
        public string lineID { get; set; }

        [JsonProperty("Problem Area")]
        public string ProbelmArea { get; set; }

        [JsonProperty("Incident Code")]
        public string IncidentCode { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("Start Time")]
        public string StartTime { get; set; }

        [JsonProperty("End Time")]
        public string EndTime { get; set; }

        [JsonProperty("Line Cleaned")]
        public bool lineClean { get; set; } = false;
    }
    public class StopTime
    {
        [JsonProperty("iStopTime")]
        public int iStopTime { get; set; }
    }
}