namespace CrownPoly.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IProHSRepository ProHSUser { get; }
        IProMasterStripRepository ProMasterStrip { get; }
        IProMRRepository ProMR { get; }
        IProPNPRepository ProPNP { get; }
        IProTBRepository ProTBUser { get; }
        IUserRepository Users { get; }
        IProReproRepository Prorepro { get; }
        IProScrapRepository ProScrap { get; }
        IProPalletizationRepository ProPalletization { get; }
        ICaseRepository CaseRepo { get; }
        IProStripCutRepository ProStripCut { get; }
        ILine Line { get; }
    }

}