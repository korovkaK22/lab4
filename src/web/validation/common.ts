export const objectIdRegex = /^[a-f\d]{24}$/i;


export interface AbstractCreateApiCallSchema<T>{
  data: T
}