using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProScrapRepository : IProScrapRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;

        public ProScrapRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }

        public async Task<List<WorkCenterData>> GetDeptList()
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //var departments = await dbConnection.QueryAsync<string>("usp_GetDeptList", parameters, commandType: CommandType.StoredProcedure);
            var departments = await _navisionApis.getDepartmentList();
            return departments.ToList();
        }

        public async Task<int> RecordScrap(RecordScrap recordScrap)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", DateTime.Parse(recordScrap.ProdDate));
            //parameters.Add("Shift", recordScrap.Shift);
            //parameters.Add("@LineID", recordScrap.LineID);
            //parameters.Add("@ItemKey", recordScrap.ItemKey);
            //parameters.Add("@Qty", recordScrap.Qty);
            var affectedRows = await _navisionApis.RecordScrap(recordScrap);
            //var affectedRow = await dbConnection.ExecuteAsync("usp_RecordScrap", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<List<ProScrap>> GetScrapKey(string workCenter)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@WorkCenter", workCenter);
            //var scrapItems = await dbConnection.QueryAsync<string>("usp_GetScrapItems", parameters, commandType: CommandType.StoredProcedure);
            var scrapItems = await _navisionApis.getScrapItems(workCenter);
            return scrapItems.ToList();
        }

        public async Task<List<GetLinesresponseData>> GetLines(string workCenter) //remaining
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@WorkCenter", workCenter);
            //var lines = await dbConnection.QueryAsync<string>("usp_GetLines", parameters, commandType: CommandType.StoredProcedure);
            var lines = await _navisionApis.getLinesForWorkCenter(workCenter);
            if (lines == null)
            {
                return new List<GetLinesresponseData>();
            }
            return lines.ToList();
        }
    }
}