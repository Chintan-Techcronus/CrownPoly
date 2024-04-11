using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProScrapRepository
    {
        Task<List<WorkCenterData>> GetDeptList();

        Task<int> RecordScrap(RecordScrap recordScrap);
        Task<List<ProScrap>> GetScrapKey(string workCenter);
        //Task<List<WorkCenterData>> GetScrapKey(string workCenter);

        Task<List<GetLinesresponseData>> GetLines(string workCenter);
    }
}