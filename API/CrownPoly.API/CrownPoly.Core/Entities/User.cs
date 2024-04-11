using Newtonsoft.Json;

namespace CrownPoly.Core.Entities
{
    public class User
    {
        [JsonProperty("userid")]
        public int Id { get; set; }

        [JsonProperty("firstname")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty("lastname")]
        public string LastName { get; set; } = string.Empty;

        [JsonProperty("pin")]
        public string? Pin { get; set; }

        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;

        [JsonProperty("isactive")]
        public bool IsActive { get; set; }

        [JsonProperty("issuper")]
        public bool IsSuper { get; set; }

        public List<ProdLines?> ProdLines { get; set; }
    }

    public class getUsers
    {
        [JsonProperty("userid")]
        public int Id { get; set; }

        [JsonProperty("firstname")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty("lastname")]
        public string LastName { get; set; } = string.Empty;

        [JsonProperty("pin")]
        public string? Pin { get; set; }

        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;

        [JsonProperty("isactive")]
        public bool IsActive { get; set; }

        [JsonProperty("issuper")]
        public bool IsSuper { get; set; }

        public string ProdLine { get; set; }
    }

    public class UserRequest
    {
        [JsonProperty("firstname")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty("lastname")]
        public string LastName { get; set; } = string.Empty;

        [JsonProperty("pin")]
        public string? Pin { get; set; }

        [JsonProperty("isactive")]
        public bool IsActive { get; set; }

        [JsonProperty("issuper")]
        public bool IsSuper { get; set; }
        public string prodLine { get; set; }
        public int id { get; set; }
        public int roleId { get; set; }
    }

    public class UserLogin
    {
        public int Pin { get; set; }
    }
    public class UserById
    {

        [JsonProperty("id")]
        public string id { get; set; }
    }
    public class ReprintByUniqueno
    {

        [JsonProperty("uniqueNo")]
        public string uniqueNo { get; set; }
    }
    public class UserByIdResponse
    {
        public string UserID { get; set; }

        public string UserName { get; set; }
        [JsonProperty("FirstName")]
        public string FirstName { get; set; }
        [JsonProperty("LastName")]
        public string LastName { get; set; }
        [JsonProperty("PIN")]
        public string PIN { get; set; }
        [JsonProperty("RoleId")]
        public int RoleId { get; set; }
        [JsonProperty("RoleName")]
        public string RoleName { get; set; }
        [JsonProperty("IsActive")]
        public bool IsActive { get; set; }

        [JsonProperty("IsSuper")]
        public bool IsSuper { get; set; }
    }

    public class ProdLines
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
    public class UpdateUser
    {
        [JsonProperty("userid")]
        public int Id { get; set; }

        [JsonProperty("isactive")]
        public bool IsActive { get; set; }

        public List<ProdLines?> ProdLines { get; set; }
    }

    public class AddUser
    {
        [JsonProperty("firstname")]
        public string FirstName { get; set; } = string.Empty;

        [JsonProperty("lastname")]
        public string LastName { get; set; } = string.Empty;

        [JsonProperty("pIN")]
        public string? pIN { get; set; }

        [JsonProperty("issuper")]
        public bool IsSuper { get; set; }
        public string prodline { get; set; }

        [JsonProperty("roleId")]
        public int roleId { get; set; }
    }

    #region Code by Parasar

    public class GetUserWiseProdlineReq
    {
        public int userId { get; set; }
    }

    public class GetUserWiseProdlineResponse
    {
        public string Id { get; set; }

        public string Name { get; set;} = string.Empty;
    }
    #endregion
}