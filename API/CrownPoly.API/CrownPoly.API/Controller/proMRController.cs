using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class proMRController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public proMRController(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        /// <summary>
        /// Get MR Lot No
        /// </summary>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetMRLotNo/{lineId}")]
        public async Task<IActionResult> GetMRLotNo(string lineId)
        {
            var lotNo = await _unitOfWork.ProMR.GetMRLotNo(lineId);
            return Ok(lotNo);
        }

    }
}