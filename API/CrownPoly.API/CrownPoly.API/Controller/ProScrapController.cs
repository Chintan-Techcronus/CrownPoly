using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProScrapController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProScrapController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get Departments
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetDeptList")]
        public async Task<IActionResult> GetDeptList()
        {
            var workOrders = await _unitOfWork.ProScrap.GetDeptList();
            return Ok(workOrders);
        }

        /// <summary>
        /// Get lines
        /// </summary>
        /// <param name="workCenter"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetLines/{workCenter}")]
        public async Task<IActionResult> GetLines(string workCenter)
        {
            var scrapItems = await _unitOfWork.ProScrap.GetLines(workCenter);
            return Ok(scrapItems);
        }

        /// <summary>
        /// Get scrap items
        /// </summary>
        /// <param name="workCenter"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetScrapKey/{workCenter}")]
        public async Task<IActionResult> GetScrapKey(string workCenter)
        {
            var scrapItems = await _unitOfWork.ProScrap.GetScrapKey(workCenter);
            return Ok(scrapItems);
        }

        /// <summary>
        /// Record Scrap
        /// </summary>
        /// <param name="recordScrap"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordScrap")]
        public async Task<IActionResult> RecordScrap(RecordScrap recordScrap)
        {
            var coreTypes = await _unitOfWork.ProScrap.RecordScrap(recordScrap);
            return Ok(coreTypes);
        }
    }
}