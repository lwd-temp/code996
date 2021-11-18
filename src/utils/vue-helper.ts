import { computed } from 'vue'

/**
 * 双向绑定简化
 */
export function useModelWrapper<T>(props: any, emit: Function, name = 'modelValue', translater?: Function) {
  return computed<T>({
    get: () => props[name],
    set: (value) => {
      emit(`update:${name}`, translater ? translater(value) : value)
    },
  })
}
