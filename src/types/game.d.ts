export interface Point {
  x: number;
  y: number;
  [key: string]: any;
}

export interface Level {
  platforms?: Point[];
  decoration?: Point[];
  coins?: Point[];
  hero?: Point;
  spiders?: Point[];
  door?: Point;
  key?: Point;
}
