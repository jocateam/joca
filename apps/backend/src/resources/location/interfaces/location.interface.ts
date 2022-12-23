export interface LocationInterface {
  id: number;
  name: string;
  country?: LocationInterface;
  latitude?: number;
  longitude?: number;
}
