using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProHSRepository : IGenericRepository<ProHsRequest>
    {
        //casecount
        //Task<int> GetCasesOnPallet(ProHsRequest countPallet);
        Task<List<CasesOnPalletResponse>> GetCasesOnPallet(ProHsRequest countPallet);
        Task<List<CasesProducedResponse>> GetCasesProduced(ProHsRequest countcase);

        Task<IEnumerable<ProdCases>> GetProdCases(ProHsRequest prodnum);
        //Task<ProdCases> GetProdCases(ProHsRequest prodnum);

        Task<List<OrderDDLData>> GetOpenProd(string lineno);

        Task<List<GetItemKeyResponse>> GetItemKey(string pronum);

        Task<string> LotTracked(ProHsRequest pronum);

        Task<List<OrderDDLData>> IsProdOrderOpen(string pronum);

        //Task<int> AddBatchCase(ProHsRequest proHs);
        Task<int> AddBatchCase(AddBatchcase proHs);

        Task<List<GetItemKey2Response>> GetItemKey2(string mLotNo);

        Task<IEnumerable<CrownPolyItem>> GetItemDetails(string itemkey);

        Task<int> RecordConsumption(ProHsRequestNew proHs);

        Task<List<CheckLotResponse>> GetCheckLot(string lotnumber);
    }
}