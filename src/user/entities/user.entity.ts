import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    const source = partial && {
      ...partial,
      createdAt: partial.createdAt?.getTime(),
      updatedAt: partial.updatedAt?.getTime(),
    };
    Object.assign(this, source);
  }
}
