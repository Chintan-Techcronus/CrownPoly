using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CaseController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get line no
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetLineNo")]
        public async Task<IActionResult> GetLineNo()
        {
            var lineNo = await _unitOfWork.CaseRepo.GetLineNo();
            return Ok(lineNo);
        }

        [Authorize]
        [HttpPost]
        [Route("GetOpenProd")]
        public async Task<IActionResult> GetOpenProd(LinesDDL linesDDL)
        {
            var lineNo = await _unitOfWork.CaseRepo.GetOpenProdByLineNo(linesDDL);
            return Ok(lineNo);
        }

        /// <summary>
        /// Get open orders for selected line
        /// </summary>
        /// <param name="selectedLine"></param>
        /// <returns></returns>
        //[Authorize]
        //[HttpGet]
        //[Route("GetOpenProd/{selectedLine}")]
        //public async Task<IActionResult> GetOpenProd(string selectedLine)
        //{
        //    //var lineNo = await _unitOfWork.CaseRepo.GetOpenProdByLineNo(selectedLine);
        //    var lineNo = await _unitOfWork.ProMasterStrip.GetWorkOrdersByLineNo(selectedLine);
        //    return Ok(lineNo);
        //}

        /// <summary>
        /// Get work center
        /// </summary>
        /// <param name="lineNo"></param>
        /// <returns></returns>
        //[Authorize]
        //[HttpGet]
        //[Route("GetWorkCenter/{lineNo}")]
        //public async Task<IActionResult> GetWorkCenter(string lineNo)
        //{
        //    var workCenter= await _unitOfWork.CaseRepo.GetWorkCenter(lineNo);
        //    return Ok(workCenter);
        //}

        /// <summary>
        /// Get lot tracked no
        /// </summary>
        /// <param name="lotTracked"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("LotTracked")]
        public async Task<IActionResult> LotTracked(Getlottracked lotTracked)
        {
            var lotTrackedNo = await _unitOfWork.CaseRepo.LotTracked(lotTracked);
            return Ok(lotTrackedNo);
        }


        [Authorize]
        [HttpPost]
        [Route("AddBatchCase")]
        public async Task<IActionResult> AddBatchCase(LotTracked addBatchCase)
        {
            var recordProd = await _unitOfWork.CaseRepo.AddBatchCase(addBatchCase);
            return Ok(recordProd);
        }

    }
}