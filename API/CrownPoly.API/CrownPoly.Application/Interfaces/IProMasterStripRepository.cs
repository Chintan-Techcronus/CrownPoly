using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProMasterStripRepository
    {
        Task<List<OrderDDLData>> GetWorkOrdersByLineNo(string lineNo);

        Task<List<MSLotNumberResponse>> GetLotNo();

        Task<List<CoreTypes>> GetCoreTypesByTypeArea(string typeArea);

        Task<List<OrderDDLData>> CheckProdOrderOpenByProdNo(string prodNo);

        Task<RecordProductionResponse> RecordProduction(RecordProduction recordProduction);

        Task<GetItemKeyResponse> GetItemKeyByProdNum(string prodNum);
    }
}