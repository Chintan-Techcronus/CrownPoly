using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProPalletizationRepository : IProPalletizationRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;

        public ProPalletizationRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }

        public async Task<List<ItemNumberResponse>> GetItemFromLine(string lineId)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", lineId);
            var lines = await _navisionApis.GetPalletItems(lineId);
           // var lines = await dbConnection.QueryAsync<ItemNumberResponse>("usp_GetPalletItems", parameters, commandType: CommandType.StoredProcedure);
            if(lines == null) {
                return new List<ItemNumberResponse>();
            }
            return lines.ToList();
        }

        public async Task<PalletSizeResponse> GetPalletSize(string itemKey)
        {
            var response = await _navisionApis.GetPalletSize(itemKey);
            if (response != null)
                return response[0];
            else return null;
        }

        public async Task<int?> GetPalletCaseCount(ProPalletizationRequest palletCaseCount)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineID", palletCaseCount.LineId);
            //parameters.Add("@ItemKey", palletCaseCount.ItemKey);
            //var plCaseCount = await dbConnection.ExecuteScalarAsync("usp_GetPalletCaseCount", parameters, commandType: CommandType.StoredProcedure);
            var plCaseCount = await _navisionApis.GetPalletCaseCount(palletCaseCount);
            if (plCaseCount == null)
                return null;
            return (int)plCaseCount;
        }

        public async Task<int> SetPallet(ProPalletizationRequest proPalletizationRequest)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", proPalletizationRequest.LineId);
            parameters.Add("@ItemKey", proPalletizationRequest.ItemKey);
            parameters.Add("@Qty", proPalletizationRequest.Qty);
            var affectedRows = await _navisionApis.SetPallet(proPalletizationRequest);
           // var affectedRow = await dbConnection.ExecuteAsync("usp_SetPallet", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<List<ProPalletizationResponse>> PrintLastPallet()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var lastPallet = await _navisionApis.PrintLastPallet();
            //var lastPallet = await dbConnection.QueryAsync<ProPalletizationResponse>("usp_PrintLastPallet", commandType: CommandType.StoredProcedure);
            if (lastPallet == null)
            {
                return new List<ProPalletizationResponse>();
            }
            return lastPallet.ToList();
        }
        public async Task<IReadOnlyList<PrintOldLotResponse>> PrintOldLotTags()
        {
            var taglist = await _navisionApis.getprintoldlogtag();
            return taglist;
        }

        public async Task<int> MovePalletCases(ProPalletizationRequest proPalletizationRequest)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", proPalletizationRequest.LineId);
            parameters.Add("@ItemKey", proPalletizationRequest.ItemKey);
            parameters.Add("@Qty", proPalletizationRequest.Qty);
            parameters.Add("@NewLineID", proPalletizationRequest.NewLineId);
            var affectedRows = await _navisionApis.MovePalletCases(proPalletizationRequest);
           // var affectedRow = await dbConnection.ExecuteAsync("usp_MoveCases", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<WriteExceptionResponse> WriteException(WriteExceptionRequest exceptionRequest)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineID", proPalletizationRequest.LineId);
            //parameters.Add("@ItemKey", proPalletizationRequest.ItemKey);
            //parameters.Add("@Qty", proPalletizationRequest.Qty);
            //parameters.Add("@NewLineID", proPalletizationRequest.NewLineId);
            var affectedRows = await _navisionApis.WriteException(exceptionRequest);
            // var affectedRow = await dbConnection.ExecuteAsync("usp_MoveCases", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<List<ProPalletizationResponse>> PalletCasesReport()
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var palletCasesReportData = await _navisionApis.PalletCasesReport();
            //var palletCasesReportData = await dbConnection.QueryAsync<ProPalletizationResponse>("usp_ReportPalletCases", commandType: CommandType.StoredProcedure);
            return palletCasesReportData.ToList();
        }
        public async Task<PrintOldLotResponse> GetLotTagsbyUniqueno(int id)
        {
            var userDetail = await _navisionApis.GetLotTagsbyUniqueno(id);
            return userDetail;

        }
    }
}