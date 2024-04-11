using CrownPoly.Application.Interfaces;

namespace CrownPoly.Infrastructure.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(IUserRepository userRepository, IProMasterStripRepository proMasterStripRepository, IProHSRepository proHSRepository, IProMRRepository proMRRepository, IProTBRepository proTBRepository, IProPNPRepository proPNPRepository, IProReproRepository proreproRepository, IProScrapRepository proScrapRepository, ICaseRepository caseRepository, IProPalletizationRepository proPalletizationRepository, IProStripCutRepository proStripCutRepository, ILine line)
        {
            Users = userRepository;
            ProMasterStrip = proMasterStripRepository;
            ProHSUser = proHSRepository;
            ProMR = proMRRepository;
            ProTBUser = proTBRepository;
            ProPNP = proPNPRepository;
            Prorepro = proreproRepository;
            ProScrap = proScrapRepository;
            CaseRepo = caseRepository;
            ProPalletization = proPalletizationRepository;
            ProStripCut = proStripCutRepository;
            Line = line;
        }

        public IUserRepository Users { get; }
        public IProHSRepository ProHSUser { get; }
        public IProMasterStripRepository ProMasterStrip { get; }
        public IProMRRepository ProMR { get; }
        public IProTBRepository ProTBUser { get; }
        public IProPNPRepository ProPNP { get; }
        public IProReproRepository Prorepro { get; }
        public IProScrapRepository ProScrap { get; }
        public ICaseRepository CaseRepo { get; }
        public IProPalletizationRepository ProPalletization { get; }
        public IProStripCutRepository ProStripCut { get; }
        public ILine Line { get; }
    }
}