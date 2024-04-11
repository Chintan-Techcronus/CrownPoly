using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProStripCutRepository
    {
        Task<RecordProductionResponse> RecordProduction(ProStripCut record);
    }
}