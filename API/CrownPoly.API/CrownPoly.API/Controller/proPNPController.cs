using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class proPNPController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public proPNPController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
        ///GetStopTime
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetStopTime")]
        public async Task<IActionResult> GetStopTime()
        {
            try
            {
                var stoptime = await _unitOfWork.ProPNP.GetStopTime();
                return Ok(stoptime);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        ///CaseCounts
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        //Update Counts
        [Authorize]
        [HttpPost]
        [Route("CaseCounts")]
        public async Task<ProHsResponse> CaseCounts(ProHsRequest count)
        {
            try
            {
                var casesProduce = await _unitOfWork.ProHSUser.GetCasesProduced(count);
                var casesPallet = await _unitOfWork.ProHSUser.GetCasesOnPallet(count);
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

        /// <summary>
        ///GetOpenProd
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
        ///GetItemKey
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
        ///SetProdNo
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
        ///ProdOrderOpen
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
        ///AddBatchCase
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
        /// GetIncidents
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetIncidents")]
        public async Task<IActionResult> GetIncidents()
        {
            try
            {
                var incidents = await _unitOfWork.ProPNP.GetIncidents();
                return Ok(incidents);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetProblemArea
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("GetProblemArea")]
        public async Task<IActionResult> GetProblemArea()
        {
            try
            {
                var probarea = await _unitOfWork.ProPNP.GetProblemArea();
                return Ok(probarea);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetProblemDesc
        /// </summary>
        /// <param name="pronum"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("GetProblemDesc/{procode}")]
        public async Task<IActionResult> GetProblemDesc(string procode)
        {
            try
            {
                var desc = await _unitOfWork.ProPNP.GetProblemDesc(procode);
                return Ok(desc);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// RecordIncident
        /// </summary>
        /// <param name="pronum"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("RecordIncident")]
        public async Task<IActionResult> RecordIncident(RecordsIncidents propnp)
        {
            try
            {
                var affectedRows = await _unitOfWork.ProPNP.RecordIncident(propnp);
                return Ok(affectedRows);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}