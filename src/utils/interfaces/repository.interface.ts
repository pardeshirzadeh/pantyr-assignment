export interface IBaseRepository<T> {
    findById(id: number): Promise<T | null>;
    findAll(page:number,limit:number): Promise<T[]>;
    create(entity: T): Promise<T>;
    update(id: string, entity:Partial<T>): Promise<T|null> 
    delete(id: string): Promise<T|null>
  }