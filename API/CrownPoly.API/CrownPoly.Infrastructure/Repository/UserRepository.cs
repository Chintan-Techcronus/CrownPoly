using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace CrownPoly.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private readonly NavisionApis _navApis;
        public UserRepository(IConfiguration configuration, NavisionApis navisionApis)
        {
            _configuration = configuration;
            _navApis = navisionApis;
        }
        public async Task<int> AddAsync(User entity)
        {
            var prodLineIds = entity.ProdLines.Select(pl => pl.Id);
            var prodLinesString = string.Join(",", prodLineIds);

            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@Id", entity.Id);
            //parameters.Add("@FirstName", entity.FirstName);
            //parameters.Add("@LastName", entity.LastName);
            //parameters.Add("@Pin", entity.Pin);
            //parameters.Add("@RoleId", entity.RoleId);
            //parameters.Add("@ProdLines", prodLinesString);

            //var affectedRows = await dbConnection.ExecuteAsync("sp_AddUserDetails", parameters, commandType: CommandType.StoredProcedure);
            UserRequest userRequest = new UserRequest();
            userRequest.IsActive = true;
            userRequest.IsSuper = entity.IsSuper;
            userRequest.FirstName = entity.FirstName;
            userRequest.LastName = entity.LastName;
            userRequest.Pin = entity.Pin;
            userRequest.prodLine = prodLinesString;
            userRequest.roleId = entity.RoleId;
            var affectedRows = await _navApis.AddUser(userRequest);
            return affectedRows;
        }

        public async Task<int> DeleteAsync(int id)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@Id", id);
            var affectedRows = await _navApis.DeleteUser(id);
            //var affectedRow = await dbConnection.ExecuteAsync("sp_DeleteUser", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        public async Task<IReadOnlyList<getUsers>> GetAllAsync()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var users = await _navApis.getAllUsers();

            return users;
        }

        public async Task<List<ProdLines>> GetProdLinesForUser(int userId)
        {
            //userId = 1705;
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var prodLines = await _navApis.GetUserWiseProdLines(userId);
            //var prodLines = dbConnection.Query<ProdLines>("sp_getUserWiseProdlines", new { UserId = userId }, commandType: CommandType.StoredProcedure).ToList();
            //var prodLines = await _navApis.GetUserWiseProdLines(userId);
            return prodLines;

        }

        public async Task<List<ProdLines>> GetProdLines()
        {
            //    using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //    var prodLines = await dbConnection.QueryAsync<ProdLines>("sp_GetProdLines", commandType: CommandType.StoredProcedure);
            var prodLines = await _navApis.GetProdLine();;

            return prodLines.ToList();
        }


        public async Task<User> GetByIdAsync(int id)
        {
            var userDetail = await _navApis.GetUserById(id);
            
            User Users = new User();
            Users.Id = Convert.ToInt32(userDetail.UserID);
            if (userDetail != null)
            {
                //user = JsonConvert.DeserializeObject<User>(JsonConvert.SerializeObject(userDetail));
                var prodLinesList = await GetProdLinesForUser(Convert.ToInt32(id));
                Users.ProdLines = prodLinesList;
                Users.FirstName = userDetail.FirstName;
                Users.LastName = userDetail.LastName;
                Users.Pin = userDetail.PIN;
                Users.IsActive = userDetail.IsActive;
                Users.IsSuper = userDetail.IsSuper;
                Users.RoleId = userDetail.IsSuper==true ? 1 : 2;
            }
            return Users;

        }

        public async Task<UpdateUser> UpdateAsync(User entity)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            //var parameters = new DynamicParameters();
            //parameters.Add("@FirstName", entity.FirstName);
            //parameters.Add("@LastName", entity.LastName);
            //parameters.Add("@Pin", entity.Pin);
            //parameters.Add("@RoleId", entity.RoleId);
            //parameters.Add("@Id", entity.Id);
            //parameters.Add("@IsActive", entity.IsActive);

            //var prodLines = entity.ProdLines.Select(pl => pl?.Id).ToList();
            //parameters.Add("@ProdLines", string.Join(",", prodLines));

            //var affectedRows = await dbConnection.ExecuteAsync("sp_UpdateUser", parameters, commandType: CommandType.StoredProcedure);
            var prodLineIds = entity.ProdLines.Select(pl => pl.Id);
            var prodLinesString = string.Join(",", prodLineIds);

            UserRequest userRequest = new UserRequest();
            userRequest.IsActive = entity.IsActive;
            userRequest.IsSuper = entity.IsSuper;
            userRequest.FirstName = entity.FirstName;
            userRequest.LastName = entity.LastName;
            userRequest.Pin = entity.Pin;
            userRequest.prodLine = prodLinesString;
            userRequest.id = entity.Id;
            userRequest.roleId = entity.RoleId;

            var affectedRows = await _navApis.UpdateUser(userRequest);
            return affectedRows;
        }

        public async Task<LoginUserData> Login(UserPin entity)
        {
            //using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            //var parameters = new DynamicParameters();
            //parameters.Add("@Pin", entity.pin);
            //var user = await dbConnection.QueryFirstOrDefaultAsync<LoginUserData>("sp_LoginUser", parameters, commandType: CommandType.StoredProcedure);
            var user = await _navApis.LoginUser(entity);
            //user.RoleId = 1;
            if (user != null)
            {
                var prodLineList = await GetProdLinesForUser(user.Id);
                user.ProdLines = prodLineList;
                user.RoleId = (user.ProdLines != null && user.ProdLines.Count > 0 && user.ProdLines[0]?.Name == "PROSUPER") ? 1 : 2;
                return user;
            }
            return user;  
        }

        public async Task<int> CheckPin(UserLogin entity)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new DynamicParameters();
            parameters.Add("@Pin", entity.Pin);
            var affectedRows = await _navApis.CheckPin(entity);
            //var result = await dbConnection.ExecuteScalarAsync<int>("sp_CheckPin", parameters, commandType: CommandType.StoredProcedure);
            return affectedRows;
        }

        Task<int> IGenericRepository<User>.UpdateAsync(User entity)
        {
            throw new NotImplementedException();
        }

        Task<IReadOnlyList<User>> IGenericRepository<User>.GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
