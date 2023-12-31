export interface SeedInterface<T = any> {
  seed(): Promise<T> | Promise<T[]>;

  seedSync?(): T | T[];
}
