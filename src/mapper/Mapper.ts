export default interface AbstractMapper<T, R> {
  toDto(entity: T): R;
}