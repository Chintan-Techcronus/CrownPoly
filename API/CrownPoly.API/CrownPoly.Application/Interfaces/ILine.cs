using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface ILine
    {
        Task<int> ReActivateLine(string lineId);

        Task<List<OpenLinesResponse>> GetOpenLines(string workCenter);

        Task<string?> CheckActiveLine(string lineId);

        //Task<Shift> GetShift(Shift shift);
        Task<ShiftData> GetShift(Shift shift);

        Task<int> ActivateLine(string lineId);

        Task<int> EndProduction(EndProduction shift);
        Task<int> WriteLog(WriteLog writeLog);
        Task<List<LineResponse>> GetClosedLines();
    }
}