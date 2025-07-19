export abstract class IBaseUseCase<K, T> {
  abstract execute(data: T): Promise<K>;
}
