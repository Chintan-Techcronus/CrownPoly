using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using CrownPoly.API.Helper;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProStripCutRepository : IProStripCutRepository
    {

        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;
        public ProStripCutRepository(IConfiguration configuration,NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }
        public async Task<RecordProductionResponse> RecordProduction(ProStripCut record)
        {
            DateTime.Parse(record.ProdDate);
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdDate", Convert.ToDateTime(record.ProdDate));
            parameters.Add("@Shift", record.Shift);
            parameters.Add("@LineID", record.LineID);
            parameters.Add("@ProdNum", record.ProdNum);
            parameters.Add("@Qty", record.Qty);
            parameters.Add("@UOM", "LBS");
            parameters.Add("@WorkCenter", "HIPPO SAK STRIP");
            parameters.Add("@LotNumber", record.LotNumber);
            RecordProduction recordProduction = new RecordProduction();
            recordProduction.ProdDate = record.ProdDate;
            recordProduction.Shift = record.Shift;
            recordProduction.ProdDate = record.LineID;
            recordProduction.ProdNum = record.ProdNum;
            recordProduction.Qty = record.Qty;
            recordProduction.uOM = "LBS";
            recordProduction.WorkCenter = "HIPPO SAK STRIP";
            recordProduction.LotNumber = record.LotNumber;
            var affectedRows = await _navisionApis.RecordProduction(recordProduction);
            //var affectedRow = await dbConnection.ExecuteAsync("usp_RecordProduction", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }
    }
}