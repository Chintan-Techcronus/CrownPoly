using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System.Data;
using System.Data.SqlClient;

namespace CrownPoly.Infrastructure.Repository
{
    public class CaseRepository : ICaseRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;

        public CaseRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }

        public async Task<List<WorkCenterData>> GetLineNo()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var lines = await dbConnection.QueryAsync<LinesDDL>("usp_GetAllLines", commandType: CommandType.StoredProcedure);
            var lines = await _navisionApis.getAllLines();
            return lines;
        }

        public async Task<List<OrderList>> GetOpenProdByLineNo(LinesDDL linesDDL)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var openOrders = await dbConnection.QueryAsync<OrderDDL>("usp_GetOpenProd", new { LineID = linesDDL.No_ }, commandType: CommandType.StoredProcedure);
            var openOrders = await _navisionApis.GetOpenProdByLine(linesDDL);
            List<OrderList> ordersList = new List<OrderList>();
            if (openOrders != null && openOrders.Count > 0)
            {
                foreach (var order in openOrders)
                {
                    var orderListItem = new OrderList
                    {
                        Order = $"{order.ProdNum},{order.ItemNum}"
                    };
                    ordersList.Add(orderListItem);
                }
            }
            return ordersList;
        }

        //public async Task<string?> GetWorkCenter(string lineNo)
        //{
        //    using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        //    var parameters = new DynamicParameters();
        //    parameters.Add("@LineID", lineNo);
        //    var workCenter = await dbConnection.ExecuteScalarAsync("usp_GetWorkCenter", parameters, commandType: CommandType.StoredProcedure);
        //    return (string?)workCenter;
        //}

        public async Task<LotTrackedresponse> LotTracked(Getlottracked lotTracked)
        {
            string prodNum = GetProdNo(lotTracked.prodorderno);
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@ProdNum", prodNum);
            ProdctionNum num = new ProdctionNum();
            num.ProdNum = prodNum;
            //var number = await dbConnection.ExecuteScalarAsync("usp_IsLotTracked", parameters, commandType: CommandType.StoredProcedure);
            var number = await _navisionApis.isLotTracked(num);
            LotTrackedresponse mlot = new LotTrackedresponse();
            mlot.No = (number == 0) ? "" : getLotNumber(lotTracked);
            return mlot;
        }

        public string GetProdNo(string prodNo)
        {
            string[] parts = prodNo.Split(',');
            string extractedProdNo = parts[0];
            return extractedProdNo;
        }

        public async Task<int> AddBatchCase(LotTracked addBatchCase)
        {
            string prodNum = GetProdNo(addBatchCase.prodOrderNo);
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@ProdDate", DateTime.Parse(addBatchCase.prodDate));
            //parameters.Add("Shift", addBatchCase.shift);
            //parameters.Add("@LineID", addBatchCase.lineID);   
            //parameters.Add("@ProdOrderNo", prodNum);
            //parameters.Add("@LotNo", addBatchCase.lotNo);
            //var affectedRows = await dbConnection.ExecuteAsync("usp_AddBatchCase", parameters, commandType: CommandType.StoredProcedure);
            addBatchCase.prodOrderNo = prodNum;
            var response = await _navisionApis.addBatchCaseData(addBatchCase);
            return response;
        }

        private string getLotNumber(Getlottracked lotTracked)
        {
            System.DateTime mProdDate = DateTime.FromOADate(0);
            mProdDate = DateTime.Parse(lotTracked.proddate);
            string tempStr = getJDate(mProdDate) + mProdDate.Year.ToString().Substring(Math.Max(mProdDate.Year.ToString().Length - 2, 0)) + lotTracked.shift + lotTracked.lineid.Substring(Math.Max(lotTracked.lineid.Length - 2, 0));
            return tempStr.ToString();
        }

        private string getJDate(DateTime mProdDate)
        {
            int theDays = (int)DateAndTime.DateDiff("d", DateAndTime.DateSerial(mProdDate.Year, 1, 0), mProdDate, FirstDayOfWeek.Sunday, FirstWeekOfYear.Jan1);
            string JDate = theDays.ToString("000");
            return JDate;
        }
    }
}