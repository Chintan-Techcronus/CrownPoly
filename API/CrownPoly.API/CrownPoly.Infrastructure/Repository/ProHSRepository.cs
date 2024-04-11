using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace CrownPoly.Infrastructure.Repository
{
    public class ProHSRepository : IProHSRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navApis;

        public ProHSRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navApis = navisionApis;
        }

        //countcase
        public async Task<List<CasesOnPalletResponse>> GetCasesOnPallet(ProHsRequest countPallet)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineID", countPallet.lineID);
            CasesOnPalletRequest casespallet = new CasesOnPalletRequest();
            casespallet.lineID = countPallet.lineID;
            var CasesOnPallet = await _navApis.GetCasesOnPallet(casespallet);
           // var CasesOnPallet = await dbConnection.QueryFirstOrDefaultAsync<int>("usp_GetCasesOnPallet", parameters, commandType: CommandType.StoredProcedure);
            return CasesOnPallet;
        }

        public async Task<List<CasesProducedResponse>> GetCasesProduced(ProHsRequest countcase)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", Convert.ToDateTime(countcase.ProdDate));
            //parameters.Add("@Shift", countcase.Shift);
            //parameters.Add("@LineID", countcase.lineID);
            //var CasesProduced = await dbConnection.QueryFirstOrDefaultAsync<int>("usp_GetCasesProduced", parameters, commandType: CommandType.StoredProcedure);
            CasesProducedRequest casesProducedRequest = new CasesProducedRequest();
            casesProducedRequest.prodDate = countcase.ProdDate;
            casesProducedRequest.shift = countcase.Shift;
            casesProducedRequest.lineID = countcase.lineID;
            var CasesProduced = await _navApis.GetCasesProduced(casesProducedRequest);
            return CasesProduced;
        }

        public async Task<IEnumerable<ProdCases>> GetProdCases(ProHsRequest prodnum)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdNum", prodnum.ProdNum);
            ProdCaseRequest producedrequest = new ProdCaseRequest();
            producedrequest.prodNum = prodnum.ProdNum;
            var ProdCases = await _navApis.GetProdCases(producedrequest);
           // var ProdCases = await dbConnection.QueryAsync<ProdCases>("usp_GetProdCases", parameters, commandType: CommandType.StoredProcedure);
            return ProdCases;
        }

        public async Task<List<OrderDDLData>> GetOpenProd(string lineno)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@LineID", lineno);
            //var ProdResult = await dbConnection.QueryAsync<ProHsRequest>("usp_GetOpenProd", parameters, commandType: CommandType.StoredProcedure);
            LinesDDL linesDDL = new LinesDDL();
            linesDDL.lineID = lineno;
            var ProdResult = await _navApis.GetOpenProdByLine(linesDDL);
            return ProdResult;
        }

        public async Task<List<GetItemKeyResponse>> GetItemKey(string pronum)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdNum", pronum);
            //var ProdResult = await dbConnection.QueryFirstOrDefaultAsync<string>("usp_GetItemKey", parameters, commandType: CommandType.StoredProcedure);
            var ProdResult = await _navApis.GetItemKey(pronum);
            return ProdResult;
        }

        public async Task<string> LotTracked(ProHsRequest pronum)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdNum", pronum.ProdNum);
            //var ProdResult = await dbConnection.QueryFirstOrDefaultAsync<string>("usp_IsLotTracked ", parameters, commandType: CommandType.StoredProcedure);
            var ProdResult = await _navApis.isLotTracked(pronum);
            string Result = Convert.ToString(ProdResult) == "0" ? null : Convert.ToString(ProdResult);
            return Result;
        }

        //Check if Production Order is open
        public async Task<List<OrderDDLData>> IsProdOrderOpen(string pronum)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdNum", pronum);
            //var ProdResult = await dbConnection.QueryAsync<ProHsRequest>("usp_IsProdOrderOpen ", parameters, commandType: CommandType.StoredProcedure);
            ProdOrderOpen prodOrderOpen = new ProdOrderOpen();
            var ProdResult = await _navApis.IsProdOrderOpen(prodOrderOpen);
            return ProdResult;
        }

        public async Task<int> AddBatchCase(AddBatchcase proHs)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", Convert.ToDateTime(proHs.proddate));
            //parameters.Add("@Shift", proHs.shift);
            //parameters.Add("@LineID", proHs.lineid);
            //parameters.Add("@ProdOrderNo", proHs.prodorderno);
            //parameters.Add("@LotNo", proHs.lotno);
            var BatchCaseresult = await _navApis.addBatchCaseData(_navApis.addbatchdata, proHs);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_AddBatchCase", parameters, commandType: CommandType.StoredProcedure);
            return BatchCaseresult;
        }

        public async Task<List<GetItemKey2Response>> GetItemKey2(string mLotNo)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LotNumber", mLotNo);
            //var keys = await dbConnection.QueryAsync<string>("usp_GetItemKey2", parameters, commandType: CommandType.StoredProcedure);
            GetItemKey2Request getItemKeyRequest = new GetItemKey2Request();
            getItemKeyRequest.lotNumber = mLotNo;
            var keys = await _navApis.getItemKey2(getItemKeyRequest);
            return keys?.ToList();
        }

        public async Task<IEnumerable<CrownPolyItem>> GetItemDetails(string itemkey)
        {
            var response = await _navApis.getItemDetails(itemkey);
            return response;
        }
        
        //CONSUMEROLL
        public async Task<List<CheckLotResponse>> GetCheckLot(string lotnumber)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LotNumber", lotnumber);
            //var CasesOnPallet = await dbConnection.QueryFirstOrDefaultAsync<string>("usp_CheckLot", parameters, commandType: CommandType.StoredProcedure);
            var CasesOnPallet = await _navApis.checkLot(lotnumber);
            return CasesOnPallet;
        }

        public async Task<int> RecordConsumption(ProHsRequestNew proHs)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", Convert.ToDateTime(proHs.ProdDate));
            //parameters.Add("@ProdNum", proHs.ProdNum);
            //parameters.Add("@LotNumber", proHs.mLotNo);
            //parameters.Add("@Qty", proHs.Qty);
            //parameters.Add("@LineID", proHs.lineID);
            //parameters.Add("@ItemKey", proHs.ItemNo);
            //parameters.Add("@Shift", proHs.Shift);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_RecordConsumption", parameters, commandType: CommandType.StoredProcedure);
            RecordConsumptionRequest recordConsumptionRequest = new RecordConsumptionRequest();
            recordConsumptionRequest.prodDate = proHs.ProdDate;
            recordConsumptionRequest.prodNum = proHs.ProdNum;
            recordConsumptionRequest.lotNumber = proHs.mLotNo;
            recordConsumptionRequest.qty = proHs.Qty;
            recordConsumptionRequest.lineID = proHs.lineID;
            recordConsumptionRequest.itemKey = proHs.ItemNo;
            recordConsumptionRequest.shift = proHs.Shift;
            var recordConsumption = await _navApis.RecordConsumption(recordConsumptionRequest);
            return recordConsumption;
        }

        public Task<int> AddAsync(ProHsRequest entity)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ProHsRequest> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(ProHsRequest entity)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<ProHsRequest>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}