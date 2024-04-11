export interface proHsRequest{
  prodDate : string;
  lineno : string ;
  shift : string ;
  workOrder :string;
  itemName :string;
  mLotNo: string;
  itemNo:string;
  itemnum:string;
  prodNum : string;
  qty : number;
  lineID :string;
  pronumlist : prodnum[];
  No_ :string
}

export interface caseCount {
  casesOnPallet :string;
  casesProduced :string;
  prodCases : any ;
}

export interface prodCases {
finished : '' ,
remainig :'' 
}

export interface prodnum{
prodNum : string;
}

export interface AddBatchCase{
  proddate : string;
  lineid : string ;
  shift : string ;
  prodorderno : string;
  lotno: string;
}

