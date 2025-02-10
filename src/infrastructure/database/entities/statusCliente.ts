import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from './';

@Entity('status_cliente')
export class StatusCliente {
  @PrimaryGeneratedColumn('increment')
  status_cliente_id: number;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @OneToMany(() => Cliente, (cliente) => cliente.status_cliente)
  clientes: Cliente[];
}
