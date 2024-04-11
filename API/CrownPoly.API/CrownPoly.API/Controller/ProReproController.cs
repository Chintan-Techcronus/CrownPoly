using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProReproController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProReproController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get ProRepro Lot No
        /// </summary>
        /// <param name="proRepro"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetProReproLotNo")]
        public async Task<IActionResult> GetProReproLotNo(ProRepro proRepro)
        {
            var lotNo = await _unitOfWork.Prorepro.GetProReproLotNo(proRepro);
            return Ok(lotNo);
        }

        /// <summary>
        /// Get ProRepro Uom
        /// </summary>
        /// <param name="proRepro"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetProReproUom")]
        public async Task<IActionResult> GetProReproUom(ProRepro proRepro)
        {
            var uom = await _unitOfWork.Prorepro.GetProReproUom(proRepro);
            return Ok(uom);
        }
    }
}