import { environment } from "src/environments/environment";


export class APIURL {

    //User Controller
    public getuserList_API_URL = environment.origin + 'User/GetAllUsers';
    public getUserById_API_URL = environment.origin + 'User/GetUserById';
    public addUser_API_URL = environment.origin + 'User/AddUser';
    public updateUser_API_URL = environment.origin + 'User/UpdateUser';
    //public deleteUser_API_URL = environment.origin + 'User/DeleteUser';
    public loginUser_API_URL = environment.origin + 'User/UserLogin';
    public getProdLineList_API_URL = environment.origin + 'User/GetProdLines';
    public checkPinExist_API_URL = environment.origin + 'User/CheckPin';

    //Case
    public getLineNo_API_URL = environment.origin + 'Case/GetLineNo';
    public getOpenProd_API_URL = environment.origin + 'Case/GetOpenProd';
    // public getWorkCenter_API_URL = environment.origin + 'Case/GetWorkCenter';
    public getLotTrackedNo_API_URL = environment.origin + 'Case/LotTracked';
    public getAddBatchCase_API_URL = environment.origin + 'Case/AddBatchCase';

    //promasterstrip
    public getWorkOrders_API_URL = environment.origin + 'promasterstrip/GetWorkOrders';
    public getCoreTypes_API_URL = environment.origin + 'promasterstrip/GetCoreTypes';
    public checkProdOrderOpen_API_URL = environment.origin + 'promasterstrip/CheckProdOrderOpen';
    public getLotNo_API_URL = environment.origin + 'promasterstrip/GetLotNo';
    public recordProduction_API_URL = environment.origin + 'promasterstrip/RecordProduction';
    public getItemKey_API_URL = environment.origin + 'promasterstrip/GetItemKey';

    //Pro-HS
    public caseCount_API_URL = environment.origin + 'proHs/CaseCounts';
    public productionOrder_API_URL = environment.origin + 'proHs/GetOpenProd';
    public productItemKey_API_URL = environment.origin + 'proHs/GetItemKey';
    public setProdNo_API_URL = environment.origin + 'proHs/SetProdNo';
    public addBatchCase_API_URL = environment.origin + 'proHs/AddBatchCase';
    public prodOrderOpen_API_URL = environment.origin + 'proHs/ProdOrderOpen';
    public getItemKey2_API_URL = environment.origin + 'proHs/GetItemKey2';
    public getItemDetails_API_URL = environment.origin + 'proHs/GetItemDetails';
    public getCheckLot_API_URL = environment.origin + 'proHs/GetCheckLot';
    public RecordConsumption_API_URL = environment.origin + 'proHs/RecordConsumption';
    public finishedCase_API_URL = environment.origin + 'proHs/FinishedCase';

    //pro-mr
    public getMRLotNo_API_URL = environment.origin + 'promr/GetMRLotNo';

    //Pro-TB
    public getProTBOpenProd_API_URL = environment.origin + 'ProTB/GetOpenProd';
    public getProTBItemKeyAPI_URL = environment.origin + 'ProTB/GetItemKey';
    public getProTBSetProdNo_API_URL = environment.origin + 'ProTB/SetProdNo';
    public getProTBCaseCounts_API_URL = environment.origin + 'ProTB/CaseCounts';
    public proTBprodOrderOpen_API_URL = environment.origin + 'proTB/ProdOrderOpen';
    public addProTBBatchCase_API_URL = environment.origin + 'proTB/AddBatchCase';
    public getProTBItemKey2_API_URL = environment.origin + 'proTB/GetItemKey2';
    public getProTBItemDetails_API_URL = environment.origin + 'proTB/GetItemDetails';
    public getProTBCheckLot_API_URL = environment.origin + 'proTB/GetCheckLot';
    public proTBRecordConsumption_API_URL = environment.origin + 'proTB/RecordConsumption';

    //Pro-PNP
    public getProPNPStopTime_API_URL = environment.origin + 'proPNP/GetStopTime';
    public getProPNPOpenProd_API_URL = environment.origin + 'proPNP/GetOpenProd';
    public getProPNPItemKeyAPI_URL = environment.origin + 'proPNP/GetItemKey';
    public getProPNPSetProdNo_API_URL = environment.origin + 'proPNP/SetProdNo';
    public getProPNPCaseCounts_API_URL = environment.origin + 'proPNP/CaseCounts';
    public proPNPprodOrderOpen_API_URL = environment.origin + 'proPNP/ProdOrderOpen';
    public addProPNPBatchCase_API_URL = environment.origin + 'proPNP/AddBatchCase';
    public getProPNPIncidents_API_URL = environment.origin + 'proPNP/GetIncidents';
    public getProPNPProblemArea_API_URL = environment.origin + 'proPNP/GetProblemArea';
    public getProPNPProblemDesc_API_URL = environment.origin + 'proPNP/GetProblemDesc';
    public addProPNPRecordIncident_API_URL = environment.origin + 'proPNP/RecordIncident';

    //pro-repro
    public getReproLotNo_API_URL = environment.origin + 'prorepro/GetProReproLotNo';
    public getReproUom_API_URL = environment.origin + 'prorepro/GetProReproUom';

    //pro-scrap
    public getDepartments_API_URL = environment.origin + 'proscrap/GetDeptList';
    public getLines_API_URL = environment.origin + 'proscrap/GetLines';
    public getScrapKey_API_URL = environment.origin + 'proscrap/GetScrapKey';
    public recordScrap_API_URL = environment.origin + 'proscrap/RecordScrap';

    //pro-palletization
    public getItem_API_URL = environment.origin + 'propalletization/GetItemFromLine';
    public getPalletSize_API_URL = environment.origin + 'propalletization/GetPalletSize';
    public getPalletCaseCount_API_URL = environment.origin + 'propalletization/GetPalletCaseCount';
    public setPallet_API_URL = environment.origin + 'propalletization/SetPallet';
    public printLastPallet_API_URL = environment.origin + 'propalletization/PrintLastPallet';
    public movePallet_API_URL = environment.origin + 'propalletization/MovePalletCases';
    public writeException_API_URL = environment.origin + 'propalletization/WriteException'
    public palletCasesReport_API_URL = environment.origin + 'propalletization/PalletCasesReport';
    public printoldlottag_API_URL = environment.origin + 'propalletization/PrintOldLotTags';
    public printlottagbyno_API_URL = environment.origin + 'propalletization/GetLotTagsbyUniqueno';

    //pro-stripcut
    public getProstripcutGetOpenProd_API_URL = environment.origin + 'ProStripCut/GetOpenProd';
    public prostripcutprodOrderOpen_API_URL = environment.origin + 'ProStripCut/ProdOrderOpen';
    public getProstripcutItemKey2_API_URL = environment.origin + 'ProStripCut/GetItemKey2';
    public getProstripcutCheckLot_API_URL = environment.origin + 'ProStripCut/GetCheckLot';
    public prostripcutRecordConsumption_API_URL = environment.origin + 'ProStripCut/RecordConsumption';
    public prostripcutRecordProduction_API_URL = environment.origin + 'ProStripCut/RecordProduction';

    // Lines
    public getClosedLines_API_URL = environment.origin + 'Line/GetClosedLines';
    public reactivateLine_API_URL = environment.origin + 'Line/ReActivateLine';
    public getOpenLines_API_URL = environment.origin + 'Line/GetOpenLines';
    public checkShift_API_URL = environment.origin + 'Line/GetShift';
    public checkActiveLine_API_URL = environment.origin + 'Line/CheckActiveLine';
    public activateLine_API_URL = environment.origin + 'Line/ActivateLine';
    public endProduction_API_URL = environment.origin + 'Line/EndProduction';
    public writeLog_API_URL = environment.origin + 'Line/WriteLog';

}