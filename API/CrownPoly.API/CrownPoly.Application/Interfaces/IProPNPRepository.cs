using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProPNPRepository
    {
        //Task<List<int>> GetStopTime();
        Task<int> GetStopTime();

        Task<List<Incident>> GetIncidents();

        Task<List<ProblemAreas>> GetProblemArea();

        Task<ProblemDescResponse> GetProblemDesc(String problemcode);

        Task<int> RecordIncident(RecordsIncidents propnp);
    }
}