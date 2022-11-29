import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "vaga",
})
export class VagaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  descricao: string;

  @Column()
  dtLimite: Date;

  @Column()
  indAtivo: boolean;

  @Column()
  maxCandidatos: number;

  @Column()
  idRecrutador: string;

  @CreateDateColumn({
    name: "created_at",
  })
  create: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  update: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_usuario",
  })
  usuario: UserEntity;
}
