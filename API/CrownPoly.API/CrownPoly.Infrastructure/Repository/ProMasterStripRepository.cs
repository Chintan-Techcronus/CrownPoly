using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProMasterStripRepository : IProMasterStripRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;

        public ProMasterStripRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }

        public async Task<List<OrderDDLData>> GetWorkOrdersByLineNo(string lineNo)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", lineNo);
            //var workOrderList = await dbConnection.QueryAsync<ProductWorkOrders>("usp_GetOpenProd", parameters, commandType: CommandType.StoredProcedure);
            LinesDDL linesDDL = new LinesDDL();
            linesDDL.lineID = lineNo;
            var workOrderList = await _navisionApis.GetOpenProdByLine(linesDDL);
            if (workOrderList == null)
            {
                return new List<OrderDDLData>();
            }
            return workOrderList.ToList();
        }

        public async Task<List<CoreTypes>> GetCoreTypesByTypeArea(string typeArea)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@TypeArea", typeArea);
            var response = await _navisionApis.getWeightsData(_navisionApis.getweights, typeArea);
            //var coreTypesList = await dbConnection.QueryAsync<CoreTypes>("usp_GetWeights", parameters, commandType: CommandType.StoredProcedure);
            return response.ToList();
            //return coreTypesList.ToList();
        }

        public async Task<List<OrderDDLData>> CheckProdOrderOpenByProdNo(string prodNo)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdNum", prodNo);
            //var openWorkOrders = await dbConnection.QueryAsync<ProductWorkOrders>("usp_IsProdOrderOpen", parameters, commandType: CommandType.StoredProcedure);
            ProdOrderOpen prodOrderOpen = new ProdOrderOpen();
            var openWorkOrders = await _navisionApis.IsProdOrderOpen(prodOrderOpen);
            return openWorkOrders;
        }

        public async Task<List<MSLotNumberResponse>> GetLotNo()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var lotNo = await _navisionApis.GetMSLotNumber();
            //var lotNo = await dbConnection.ExecuteScalarAsync("usp_GetMSLotNumber", commandType: CommandType.StoredProcedure);
            return lotNo;
        }

        public async Task<RecordProductionResponse> RecordProduction(RecordProduction recordProduction)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdDate", DateTime.Parse(recordProduction.ProdDate));
            parameters.Add("Shift", recordProduction.Shift);
            parameters.Add("@LineID", recordProduction.LineID);
            parameters.Add("@ProdNum", recordProduction.ProdNum);
            parameters.Add("@Qty", recordProduction.Qty);
            parameters.Add("@UOM", recordProduction.uOM);
            parameters.Add("@WorkCenter", recordProduction.WorkCenter);
            parameters.Add("@LotNumber", recordProduction.LotNumber);
            var affectedRows = await _navisionApis.RecordProduction(recordProduction);
            //var affectedRow = await dbConnection.ExecuteAsync("usp_RecordProduction", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<GetItemKeyResponse> GetItemKeyByProdNum(string prodNum)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdNum", prodNum);
            var ProdResult = await _navisionApis.GetItemKey(prodNum);
            //var itemNo = await dbConnection.ExecuteScalarAsync("usp_GetItemKey", parameters, commandType: CommandType.StoredProcedure);
            //return (string?)itemNo;
            return ProdResult[0];
           
        }
    }
}