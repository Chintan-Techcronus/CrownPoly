using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CrownPoly.Infrastructure.Repository
{
    public class LineRepository : ILine
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;

        public LineRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }

        public async Task<int> ReActivateLine(string lineId)
        {
            var affectedRows = await _navisionApis.reActivateLine(lineId);
            return affectedRows;
        }

        public async Task<List<OpenLinesResponse>> GetOpenLines(string workCenter)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@WorkCenter", workCenter);
            //var openLines = await dbConnection.QueryAsync<string>("usp_GetOpenLines", parameters, commandType: CommandType.StoredProcedure);
            var openLines = await _navisionApis.getOpenLines(workCenter);
            return openLines;
        }

        public async Task<string?> CheckActiveLine(string lineId)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineId", lineId);
            //var lineNo = await dbConnection.ExecuteScalarAsync("usp_IsLineActive", parameters, commandType: CommandType.StoredProcedure);
            var lineNo = await _navisionApis.isLineActive(lineId);
            return (lineNo == null) ? "" : lineNo[0].No;
        }

        public async Task<ShiftData> GetShift(Shift shift)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", Convert.ToDateTime(shift.ProdDate));
           // parameters.Add("@ShiftAMPM", shift.ShiftAMPM);
            var shiftdata = await _navisionApis.GetShift(shift);
            // var shiftName = await dbConnection.ExecuteScalarAsync<string>("usp_GetShift", parameters, commandType: CommandType.StoredProcedure);
            //shift.shift = (shiftName == null) ? "" : shiftName;
            return (shiftdata == null) ? null : shiftdata[0];
            //return shiftdata[0];
        }

        public async Task<int> ActivateLine(string lineId)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineID", lineId);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_ActivateLine", parameters, commandType: CommandType.StoredProcedure);
            var affectedRows = await _navisionApis.AddLine(lineId);
            return affectedRows;
        }

        public async Task<int> EndProduction(EndProduction endProduction)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", endProduction.lineID);
            parameters.Add("@WorkCenter", endProduction.workCenter);
            var affectedRows = await _navisionApis.EndProduction(endProduction);
            //var affectedrows = await dbConnection.ExecuteAsync("usp_EndProduction", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<int> WriteLog(WriteLog writeLog)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@UserID", writeLog.userId);
            //parameters.Add("@LogIn", writeLog.logIn);
            //parameters.Add("@LogOut", writeLog.logOut);
            //parameters.Add("@ProdDate", writeLog.prodDate);
            //parameters.Add("@Line", writeLog.line);
            //parameters.Add("@Shift", writeLog.shift);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_WriteLog", parameters, commandType: CommandType.StoredProcedure);
            var affectedRows = await _navisionApis.writeLog(writeLog);
            return affectedRows;
        }

        public async Task<List<LineResponse>> GetClosedLines()
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            var closedLines = await _navisionApis.getclosedlinesData();
            //var closedlines = await dbConnection.QueryAsync<string>("usp_GetClosedLines", commandType: CommandType.StoredProcedure);
            if (closedLines == null)
            {
                return new List<LineResponse>();
            }
            return closedLines.ToList();
        }
    }
}