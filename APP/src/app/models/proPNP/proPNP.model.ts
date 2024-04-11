export interface RecordIncident{
  ProdDate : string;
  Shift : string ;
  lineID : string ;
  ProbelmArea :string;
  IncidentCode :number;
  Description: string;
  StartTime: Date;
  EndTime: Date;
  lineClean : boolean;
}
export interface Incident
{
  incidentCode : String;

  incidentName : string;
}

export interface ProblemArea
{
  areaid: number;
  problemArea: String;
}