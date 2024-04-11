using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LineController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public LineController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// ReActivate line
        /// </summary>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("ReActivateLine/{lineId}")]
        public async Task<IActionResult> ReActivateLine(string lineId)
        {
            var deletedRows = await _unitOfWork.Line.ReActivateLine(lineId);
            return Ok(deletedRows);
        }

        /// <summary>
        /// Get open lines
        /// </summary>
        /// <param name="workCenter"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetOpenLines/{workCenter}")]
        public async Task<IActionResult> GetOpenLines(string workCenter)
        {
            //workCenter = "HIPPO SAK STRIP";
            var openLines = await _unitOfWork.Line.GetOpenLines(workCenter);
            return Ok(openLines);
        }

        /// <summary>
        /// Check line is active or not.
        /// </summary>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("CheckActiveLine/{lineId}")]
        public async Task<IActionResult> CheckActiveLine(string lineId)
        {
            var openLines = await _unitOfWork.Line.CheckActiveLine(lineId);
            return Ok(openLines);
        }

        /// <summary>
        /// Get shift
        /// </summary>
        /// <param name="shift"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetShift")]
        public async Task<IActionResult> GetShift(Shift shift)
        {
            var openLines = await _unitOfWork.Line.GetShift(shift);
            return Ok(openLines);
        }

        /// <summary>
        /// Activate line
        /// </summary>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("ActivateLine/{lineId}")]
        public async Task<IActionResult> ActivateLine(string lineId)
        {
            var affectedRows = await _unitOfWork.Line.ActivateLine(lineId);
            return Ok(affectedRows);
        }

        /// <summary>
        /// End production
        /// </summary>
        /// <param name="endProduction"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("EndProduction")]
        public async Task<IActionResult> EndProduction(EndProduction endProduction)
        {
            var openLines = await _unitOfWork.Line.EndProduction(endProduction);
            return Ok(openLines);
        }

        /// <summary>
        /// Write log
        /// </summary>
        /// <param name="writeLog"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("WriteLog")]
        public async Task<IActionResult> WriteLog(WriteLog writeLog)
        {
            var openLines = await _unitOfWork.Line.WriteLog(writeLog);
            return Ok(openLines);
        }

        /// <summary>
        /// Get closed lines
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetClosedLines")]
        public async Task<IActionResult> GetClosedLines()
        {
            var closedLines = await _unitOfWork.Line.GetClosedLines();
            return Ok(closedLines);
        }
    }
}