using CrownPoly.Core.Entities;

namespace CrownPoly.Application.Interfaces
{
    public interface IProPalletizationRepository
    {
        Task<List<ItemNumberResponse>> GetItemFromLine(string lineId);

        Task<PalletSizeResponse> GetPalletSize(string itemKey);

        Task<int?> GetPalletCaseCount(ProPalletizationRequest palletCaseCount);

        Task<int> SetPallet(ProPalletizationRequest setPallet);

        Task<List<ProPalletizationResponse>> PrintLastPallet();
        Task<IReadOnlyList<PrintOldLotResponse>> PrintOldLotTags();

        Task<int> MovePalletCases(ProPalletizationRequest movePallet);

        Task<List<ProPalletizationResponse>> PalletCasesReport();

        Task<WriteExceptionResponse> WriteException(WriteExceptionRequest exceptionRequest);
        Task<PrintOldLotResponse> GetLotTagsbyUniqueno(int id);
    }
}