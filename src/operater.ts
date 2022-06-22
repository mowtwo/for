import type { ArrayValue, ForOptions } from "./type";

const breakDesc = '$$__break-point__'

const _breakPoint = Symbol(breakDesc)

export type BreankPoint = typeof _breakPoint

export function breakPoint() {
  return _breakPoint as BreankPoint
}

export function genStepArray(step: number, max: number): ForOptions<number> {
  let current = 0
  return {
    next: v => () => {
      current = v + step
      v = current
      if (v > max) {
        return _breakPoint
      }
      return v
    }
  }
}

export function genFillAsLength(fillValue): ForOptions<number> {
  return {
    next: len => () => {
      len--
      if (len < 0) {
        return _breakPoint
      }
      return fillValue
    }
  }
}

export function genFillAsValue<T>(len: number): ForOptions<T> {
  return {
    next: v => () => {
      len--
      if (len < 0) {
        return _breakPoint
      }
      return v
    }
  }
}

export function withNormalArray<T extends Array<any>>(): ForOptions<T, ArrayValue<T>> {
  let i = 0
  return {
    next: v => () => {
      if (v.length === i) {
        i = 0
        return _breakPoint
      }
      return v[i++]
    }
  }
}