export interface LotTracked {
    proddate: string;
    lineid: string;
    shift: string;
    prodorderno: string;
}

export interface LineRequest {
    No: string;
}

export interface AddBatchCaseMoodule{
    proddate : string;
    lineid : string ;
    shift : string ;
    prodorderno : string;
    lotno: string;
  }