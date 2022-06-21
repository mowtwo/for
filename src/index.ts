import { breakPoint } from "./operater.js";
import type { ForOptions, ForResult } from "./type";

let currentFor: number = null
let forId = 0

let passedID = -1

function For<T>(value: T, { next = () => () => null }: Partial<ForOptions<T>> = {}): ForResult<T> {
  const nextFatory = next(value)
  let id = forId = forId + 1
  // let lastValue = value
  let index = 0
  return {
    weakMap(mapFn) {
      let lastId = currentFor
      currentFor = id
      index = 0
      return {
        *[Symbol.iterator]() {
          while (true) {
            const result = nextFatory()
            if (result != breakPoint() && passedID !== currentFor) {
              // lastValue = result as T
              yield mapFn(result as T, index++)
            } else {
              index = 0
              currentFor = lastId
              return
            }
          }
        }
      }
    },
    map<V = T>(mapFn) {
      return [...this.weakMap(mapFn)] as V[]
    },
    each(eachFn) {
      ;[...this.map<void>(eachFn)]
    },
    toArray() {
      return [...this.map(n => n)]
    },
    fork(options) {
      return For(value, options)
    }
  }
}

export function pass<T>(value: T = void 0): T | void {
  passedID = currentFor
  return value
}


export default For
export { genFillAsLength, genFillAsValue, genStepArray, breakPoint, type BreankPoint } from "./operater.js";
export type { ForOptions, ForResult } from "./type"