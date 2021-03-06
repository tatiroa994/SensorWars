export interface Alert {
  sensor: number;
  ship: string;
  magto: number;
  time: Date;
}

export interface DataAlert {
  ship: string;
  magto: number;
  proximity: { count: number; type: string };
  alert: { type: number };
  sensor: number;
}

export interface ChartALert {
  dangerCount: number;
  inactiveCount: number;
}
