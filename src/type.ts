import { BreankPoint } from "./operater"

export interface ForOptions<T, R = T> {
  next(value: T): () => R | BreankPoint
}

export interface ForResult<T> {
  each(this: ForResult<T>, eachFn: (value: T, index: number) => void): void
  map<V = T>(this: ForResult<T>, mapFn: (value: T, index: number) => V): V[]
  weakMap<V = T>(mapFn: (value: T, index: number) => V): Iterable<V>
  toArray(this: ForResult<T>): T[]
  fork(options: ForOptions<T>): ForResult<T>
}

export type ArrayValue<T> = T extends Array<infer V> ? V : never