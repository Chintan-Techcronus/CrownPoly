using CrownPoly.API.Helper;
using CrownPoly.Application.Interfaces;
using CrownPoly.Infrastructure.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CrownPoly.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ICaseRepository, CaseRepository>();
            services.AddTransient<IProMasterStripRepository, ProMasterStripRepository>();
            services.AddTransient<IProMRRepository, ProMRRepository>();
            services.AddTransient<IProReproRepository, ProReproRepository>();
            services.AddTransient<IProHSRepository, ProHSRepository>();
            services.AddTransient<IProTBRepository, ProTBRepository>();
            services.AddTransient<IProPNPRepository, ProPNPRepository>();
            services.AddTransient<IProScrapRepository, ProScrapRepository>();
            services.AddTransient<IProPalletizationRepository, ProPalletizationRepository>();
            services.AddTransient<IProStripCutRepository, ProStripCutRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ILine, LineRepository>();
            services.AddSingleton(configuration);
            services.AddSingleton<NavisionApis>();
            services.AddSingleton<JwtToken>();
        }
    }
}