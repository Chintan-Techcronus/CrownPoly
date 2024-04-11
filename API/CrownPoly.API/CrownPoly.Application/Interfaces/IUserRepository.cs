using CrownPoly.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Application.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<LoginUserData> Login(UserPin entity);
        Task<List<ProdLines>> GetProdLines();
        Task<int> CheckPin(UserLogin entity);
        Task<UpdateUser> UpdateAsync(User entity);

        Task<IReadOnlyList<getUsers>> GetAllAsync();

    }


}
