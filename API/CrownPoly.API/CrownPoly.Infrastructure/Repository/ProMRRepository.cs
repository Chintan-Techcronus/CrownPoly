using CrownPoly.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using CrownPoly.API.Helper;
using CrownPoly.Core.Entities;

namespace CrownPoly.Infrastructure.Repository
{
    internal class ProMRRepository : IProMRRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navisionApis;
        public ProMRRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navisionApis = navisionApis;
        }
        public async Task<List<GetProMRLotNoResponse?>> GetMRLotNo(string lineId)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@LineID", lineId);
            //var MRlotNo = await dbConnection.ExecuteScalarAsync("usp_GetMRLotNumber", parameters, commandType: CommandType.StoredProcedure);
            var MRlotNo = await _navisionApis.GetMRLotNumber(lineId);
            return MRlotNo;
        }
    }
}
