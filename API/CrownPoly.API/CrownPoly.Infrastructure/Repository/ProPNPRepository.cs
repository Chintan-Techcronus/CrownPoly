using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProPNPRepository : IProPNPRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navApis;

        public ProPNPRepository(IConfiguration configuration , NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navApis = navisionApis;
        }

        public async Task<int> GetStopTime()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            var stoptime = await _navApis.GetStopTime();
            //var stoptime = await dbConnection.QueryAsync<int>("usp_GetStopTime", commandType: CommandType.StoredProcedure);
            return Convert.ToInt32(stoptime.iStopTime);
        }

        public async Task<List<Incident>> GetIncidents()
        {
            var response = await _navApis.getIncidentData();
            return response;
        }

        public async Task<List<ProblemAreas>> GetProblemArea()
        {
            var response = await _navApis.getProblemareaData();
            return response;
        }

        public async Task<ProblemDescResponse> GetProblemDesc(string problemcode)
        {
            //var response = await _navApis.getIncidentData(_navApis.getIncidentDetails,problemcode);
            var response = await _navApis.GetProblemDesc(problemcode);
            return response[0];
        }
        public async Task<int> RecordIncident(RecordsIncidents propnp)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", propnp.ProdDate);
            //parameters.Add("@Shift", propnp.Shift);
            //parameters.Add("@LineID", propnp.lineID);
            //parameters.Add("@ProblemArea", propnp.ProbelmArea);
            //parameters.Add("@IncidentCode", propnp.IncidentCode);
            //parameters.Add("@Description", propnp.Description);
            //parameters.Add("@StartTime ", propnp.StartTime);
            //parameters.Add("@EndTime", propnp.EndTime);
            //parameters.Add("@LineClean", propnp.lineClean);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_RecordIncident", parameters, commandType: CommandType.StoredProcedure);

            var response = await _navApis.addRecordIncidentData(_navApis.addrecordincidentdata, propnp);
            return response;
        }
    }
}