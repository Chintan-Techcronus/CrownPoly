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
    public class ProReproRepository : IProReproRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navApis;

        public ProReproRepository(IConfiguration configuration,NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navApis = navisionApis;
        }
        public async Task<ProRepro> GetProReproLotNo(ProRepro proRepro)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            System.DateTime mProdDate = DateTime.FromOADate(0);
            mProdDate = DateTime.Parse(proRepro.ProdDate);
            var parameters = new DynamicParameters();
            string lotStart = getJDate(mProdDate) + mProdDate.Year.ToString().Substring(Math.Max(mProdDate.Year.ToString().Length - 2, 0)) + proRepro.Shift;
            parameters.Add("@LotStart", lotStart);
            ReproLot lotdata = new ReproLot();
            lotdata.lotStart = lotStart;
            var response = await _navApis.GetProReproLotNo(lotdata);
            //string? reproLotNo = await dbConnection.ExecuteScalarAsync<string>("usp_GetReproLot", parameters, commandType: CommandType.StoredProcedure);
            
            //proRepro.LotNo = (response.lotresponse == null) ? "" : response.lotresponse;
            if (response != null && response.LotStart != "")
                proRepro.LotNo = response.LotStart;
            return proRepro;
        }
        private string getJDate(DateTime mProdDate)
        {
            int theDays = (int)DateAndTime.DateDiff("d", DateAndTime.DateSerial(mProdDate.Year, 1, 0), mProdDate, FirstDayOfWeek.Sunday, FirstWeekOfYear.Jan1);
            string JDate = theDays.ToString("000");
            return JDate;
        }
        public async Task<UOMData> GetProReproUom(ProRepro proRepro)
        {
            //proRepro.ItemKey = "HP-RM-003";
            var response = await _navApis.getUOMData(proRepro);
            return response;
        }
    };
}