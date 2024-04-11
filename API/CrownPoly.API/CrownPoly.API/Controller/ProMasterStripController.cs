using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProMasterStripController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProMasterStripController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get work orders
        /// </summary>
        /// <param name="lineNo"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetWorkOrders/{lineNo}")]
        public async Task<IActionResult> GetWorkOrders(string lineNo)
        {
            var workOrders = await _unitOfWork.ProMasterStrip.GetWorkOrdersByLineNo(lineNo);
            return Ok(workOrders);
        }

        /// <summary>
        /// Get core types
        /// </summary>
        /// <param name="typeArea"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetCoreTypes/{typeArea}")]
        public async Task<IActionResult> GetCoreTypes(string typeArea)
        {
            var coreTypes = await _unitOfWork.ProMasterStrip.GetCoreTypesByTypeArea(typeArea);
            return Ok(coreTypes);
        }

        /// <summary>
        /// Check if prod order is open
        /// </summary>
        /// <param name="prodNo"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("CheckProdOrderOpen/{prodNo}")]
        public async Task<IActionResult> CheckProdOrderOpen(string prodNo)
        {
            var coreTypes = await _unitOfWork.ProMasterStrip.CheckProdOrderOpenByProdNo(prodNo);
            return Ok(coreTypes);
        }

        /// <summary>
        /// Get lot No
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetLotNo")]
        public async Task<IActionResult> GetLotNo()
        {
            var lotNo = await _unitOfWork.ProMasterStrip.GetLotNo();
            return Ok(lotNo);
        }

        /// <summary>
        /// Record production
        /// </summary>
        /// <param name="recordProduction"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordProduction")]
        public async Task<IActionResult> RecordProduction(RecordProduction recordProduction)
        {
            var recordProd = await _unitOfWork.ProMasterStrip.RecordProduction(recordProduction);
            return Ok(recordProd);
        }

        /// <summary>
        /// Get Item Key
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetItemKey/{prodNum}")]
        public async Task<IActionResult> GetItemKeyByProdNum(string prodNum)
        {
            var itemNo = await _unitOfWork.ProMasterStrip.GetItemKeyByProdNum(prodNum);
            return Ok(itemNo);
        }
    }
}