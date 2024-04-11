using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface ICaseRepository
    {
        Task<List<WorkCenterData>> GetLineNo();
        Task<List<OrderList>> GetOpenProdByLineNo(LinesDDL linesDDL);

        //Task<List<OrderList>> GetOpenProdByLineNo(string selectedLine);
        //Task<string?> GetWorkCenter(string selectedLine);

        Task<LotTrackedresponse> LotTracked(Getlottracked lotTracked);
        Task<int> AddBatchCase(LotTracked addBatchCase);
    }
}