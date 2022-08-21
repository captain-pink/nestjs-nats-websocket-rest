export type VehicleMessageInput = {
  subject: string;
  time: Date;
  energy: number;
  gps: Array<string>;
  odo: number;
  speed: number;
  soc: number;
};
