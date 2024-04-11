using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProStripCutController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProStripCutController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// GetOpenProd
        /// </summary>
        /// <param name="lineno"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetOpenProd/{lineno}")]
        public async Task<List<OrderDDLData>> GetOpenProd(string lineno)
        {
            var ProdResult = await _unitOfWork.ProHSUser.GetOpenProd(lineno);
            return ProdResult;
        }

        /// <summary>
        /// ProdOrderOpen
        /// </summary>
        /// <param name="pronum"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("ProdOrderOpen/{pronum}")]
        public async Task<IActionResult> ProdOrderOpen(string pronum)
        {
            try
            {
                var isprodopen = await _unitOfWork.ProHSUser.IsProdOrderOpen(pronum);
                return Ok(isprodopen);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetItemKey2
        /// </summary>
        /// <param name="lotno"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetItemKey2/{lotno}")]
        public async Task<IActionResult> GetItemKey2(string lotno)
        {
            try
            {
                var itemno = await _unitOfWork.ProHSUser.GetItemKey2(lotno);
                return Ok(itemno);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetCheckLot
        /// </summary>
        /// <param name="lotnumber"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetCheckLot/{lotnumber}")]
        public async Task<IActionResult> GetCheckLot(string lotnumber)
        {
            try
            {
                var remqty = await _unitOfWork.ProHSUser.GetCheckLot(lotnumber);
                return Ok(remqty);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// RecordConsumption
        /// </summary>
        /// <param name="proScrapcut"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordConsumption")]
        public async Task<IActionResult> RecordConsumption(ProHsRequestNew proStripcut)
        {
            try
            {
                var record = await _unitOfWork.ProHSUser.RecordConsumption(proStripcut);
                return Ok(record);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// RecordProduction
        /// </summary>
        /// <param name="proScrapcut"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordProduction")]
        public async Task<IActionResult> RecordProduction(ProStripCut proStripcut)
        {
            try
            {
                var record = await _unitOfWork.ProStripCut.RecordProduction(proStripcut);
                return Ok(record);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}