using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProPalletizationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProPalletizationController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Line id
        /// </summary>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetItemFromLine/{lineId}")]
        public async Task<IActionResult> GetItemFromLine(string lineId)
        {
            var items = await _unitOfWork.ProPalletization.GetItemFromLine(lineId);
            return Ok(items);
        }

        /// <summary>
        /// Get pallet size case count
        /// </summary>
        /// <param name="itemKey"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetPalletSize/{itemKey}")]
        public async Task<IActionResult> GetPalletSize(string itemKey)
        {
            var palletSizeCount = await _unitOfWork.ProPalletization.GetPalletSize(itemKey);
            return Ok(palletSizeCount);
        }

        /// <summary>
        /// Get Pallet case count
        /// </summary>
        /// <param name="palletCaseCount"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetPalletCaseCount")]
        public async Task<IActionResult> GetPalletCaseCount(ProPalletizationRequest palletCaseCount)
        {
            var caseCount = await _unitOfWork.ProPalletization.GetPalletCaseCount(palletCaseCount);
            return Ok(caseCount);
        }

        /// <summary>
        /// Set pallet data
        /// </summary>
        /// <param name="setPallet"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("SetPallet")]
        public async Task<IActionResult> SetPallet(ProPalletizationRequest setPallet)
        {
            var palletData = await _unitOfWork.ProPalletization.SetPallet(setPallet);
            return Ok(palletData);
        }

        /// <summary>
        /// Print Last Pallet
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("PrintLastPallet")]
        public async Task<IActionResult> PrintLastPallet()
        {
            var lastPalletData = await _unitOfWork.ProPalletization.PrintLastPallet();
            return Ok(lastPalletData);
        }

        /// <summary>
        /// Move pallet case
        /// </summary>
        /// <param name="movePallet"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("MovePalletCases")]
        public async Task<IActionResult> MovePalletCases(ProPalletizationRequest movePallet)
        {
            var movedPalletCount = await _unitOfWork.ProPalletization.MovePalletCases(movePallet);
            return Ok(movedPalletCount);
        }

        /// <summary>
        /// WriteException
        /// </summary>
        /// <param name="WriteException"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("WriteException")]
        public async Task<IActionResult> WriteException(WriteExceptionRequest exception)
        {
            var movedPalletCount = await _unitOfWork.ProPalletization.WriteException(exception);
            return Ok(movedPalletCount);
        }

        /// <summary>
        /// Pallet Cases Report
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("PalletCasesReport")]
        public async Task<IActionResult> PalletCasesReport()
        {
            var palletCasesReport = await _unitOfWork.ProPalletization.PalletCasesReport();
            return Ok(palletCasesReport);
        }

        [Authorize]
        [HttpGet]
        [Route("PrintOldLotTags")]
        public async Task<IActionResult> PrintOldLotTags()
        {
            var lastPalletData = await _unitOfWork.ProPalletization.PrintOldLotTags();
            return Ok(lastPalletData);
        }

        [Authorize]
        [HttpPost]
        [Route("GetLotTagsbyUniqueno/{no}")]
        public async Task<IActionResult> GetLotTagsbyUniqueno(int no)
        {
            var lastPalletData = await _unitOfWork.ProPalletization.GetLotTagsbyUniqueno(no);
            return Ok(lastPalletData);
        }
    }
}
