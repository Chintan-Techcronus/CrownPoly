using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class proHSController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public proHSController(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        private string getJDate(ProHsRequest proHsRequest)
        {
            var Date = DateTime.Parse(proHsRequest.ProdDate);
            int theDays = (int)DateAndTime.DateDiff("d", DateAndTime.DateSerial(Date.Year, 1, 0), proHsRequest.ProdDate, FirstDayOfWeek.Sunday, FirstWeekOfYear.Jan1);
            string JDate = theDays.ToString("000");
            return JDate;
        }

        private string getLotNumber(ProHsRequest proHsRequest)
        {
            var Date = DateTime.Parse(proHsRequest.ProdDate);
            string tempStr = getJDate(proHsRequest) + Date.Year.ToString().Substring(Math.Max(Date.Year.ToString().Length - 2, 0)) + proHsRequest.Shift + proHsRequest.lineID.Substring(Math.Max(proHsRequest.lineID.Length - 2, 0));
            return tempStr;
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
        /// GetItemKey
        /// </summary>
        /// <param name="pronum"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetItemKey/{pronum}")]
        public async Task<IActionResult> GetItemKey(string pronum)
        {
            try
            {
                var ItemNo = await _unitOfWork.ProHSUser.GetItemKey(pronum);
                return Ok(ItemNo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// AddBatchCase
        /// </summary>
        /// <param name="Pronum"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("AddBatchCase")]
        public async Task<IActionResult> AddBatchCase(AddBatchcase Pronum)
        {
            try
            {
                var batchcase = await _unitOfWork.ProHSUser.AddBatchCase(Pronum);
                return Ok(batchcase);
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
        /// GetItemDetails
        /// </summary>
        /// <param name="itemkey"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetItemDetails/{itemkey}")]
        public async Task<IActionResult> GetItemDetails(string itemkey)
        {
            try
            {
                var itemlist = await _unitOfWork.ProHSUser.GetItemDetails(itemkey);
                return Ok(itemlist);
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
        /// <param name="proHs"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordConsumption")]
        public async Task<IActionResult> RecordConsumption(ProHsRequestNew proHs)
        {
            try
            {
                var record = await _unitOfWork.ProHSUser.RecordConsumption(proHs);
                return Ok(record);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// SetProdNo
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("SetProdNo")]
        public async Task<ProHsRequest> SetProdNo(ProHsRequest response)
        {
            try
            {
                var ItemKey = await _unitOfWork.ProHSUser.LotTracked(response);
                if (ItemKey == null)
                {
                    response.mLotNo = "";
                }
                else
                {
                    response.mLotNo = getLotNumber(response);
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// CaseCounts
        /// Update Counts
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("CaseCounts")]
        public async Task<ProHsResponse> CaseCounts(ProHsRequest count)
        {
            try
            {
                var casesProduce = await _unitOfWork.ProHSUser.GetCasesProduced(count);
                var casesPallet = await _unitOfWork.ProHSUser.GetCasesOnPallet(count);
                //ProdCases = await _unitOfWork.ProHSUser.GetProdCases(count),
               //var ProdCases = await _unitOfWork.ProHSUser.GetProdCases(count),
                    
                var countresponse = new ProHsResponse
                {
                    CasesOnPallet = Convert.ToInt32(casesPallet[0].CaseID),
                    CasesProduced = Convert.ToInt32(casesProduce[0].Qty),
                    ProdCases = await _unitOfWork.ProHSUser.GetProdCases(count),
                };
                return countresponse;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}