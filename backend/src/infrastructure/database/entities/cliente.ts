import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaCliente, Cidade, StatusCliente } from './';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  cliente_id: number;

  @Column({ type: 'int', nullable: false })
  codigo: number;

  @Column({ type: 'varchar', length: 90 })
  nome: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nome_empresa: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  tipo_doc: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  numero_doc: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ie: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  telefone_comercial: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  num_endereco: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 90 })
  data_criacao: Date;

  @Column({ type: 'varchar', length: 90 })
  data_atualizacao: Date;

  @Column({ type: 'tinyint', default: 0, nullable: true })
  ativo: number;

  @Column({ type: 'varchar', length: 180, nullable: true })
  cidade_string: string;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'cidade_id' })
  cidade: Cidade;

  @ManyToOne(() => CategoriaCliente)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaCliente;

  @ManyToOne(() => StatusCliente)
  @JoinColumn({ name: 'status' })
  status: StatusCliente;
}
