import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venda } from './venda';
import { StatusPagamento } from './statusPagamento';

@Entity('parcela_credito')
export class ParcelaCredito {
  @PrimaryGeneratedColumn('increment')
  parcela_id: number;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  juros: number;

  @Column({ type: 'date' })
  data_criacao: Date;

  @Column({ type: 'date' })
  data_vencimento: Date;

  @Column({ type: 'date', nullable: true })
  data_pagamento: Date;

  @Column({ type: 'varchar', length: 180, nullable: true })
  atualizado_por: string;

  @ManyToOne(() => StatusPagamento)
  @JoinColumn({ name: 'status_pagamento_id' })
  status_pagamento: StatusPagamento;

  @ManyToOne(() => Venda, (venda) => venda.parcela_credito)
  @JoinColumn({ name: 'venda_id' })
  venda: Venda;
}
