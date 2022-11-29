import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    length: 60,
  })
  nome: string;

  @Column({
    length: 60,
  })
  username: string;

  @Column()
  senha: number;

  @Column()
  tipo: string;

  @Column({
    length: 60,
  })
  empresa: string;

  @CreateDateColumn({
    name: "created_at",
  })
  create: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  update: Date;
}
