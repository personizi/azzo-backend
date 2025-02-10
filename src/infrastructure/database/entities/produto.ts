import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaProduto, Fornecedor, ItensVenda } from './';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('increment')
  produto_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 90, nullable: true })
  nome: string;

  @Column({ type: 'tinyint', default: 0, nullable: true })
  ativo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_venda: number;

  @Column({ type: 'int', nullable: true })
  ncm: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ean: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_custo: number;

  @Column({ type: 'decimal', nullable: true })
  peso_grs: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fotoUrl: string;

  @Column({ type: 'varchar', length: 90 })
  data_criacao: Date;

  @Column({ type: 'varchar', length: 90 })
  data_atualizacao: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descricao_uni: string;

  @ManyToOne(() => CategoriaProduto)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaProduto;

  @ManyToOne(() => Fornecedor, { nullable: true })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Fornecedor;

  @OneToMany(() => ItensVenda, (vp) => vp.produto, { cascade: true })
  itens_venda: ItensVenda[];
}
