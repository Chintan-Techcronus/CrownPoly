export interface Promasterstrip {
    typeArea: string;
    lineNo: string;
    workOrders: WorkOrders[];
}

export interface WorkOrders {
    prodNum: string;
    itemNum: string;
}

export interface WorkOrders {
    typeDesc: string;
    weight: number;
}

export interface RecordProduction{
    prodDate: string;
    shift: string;
    lineId: string;
    prodNum: string;
    qty: string;
    uom: string;
    workCenter: string;
    lotNumber: string;
}
