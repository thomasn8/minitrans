import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  colorName: string;

	@Column()
  rgb: string;

	@Column()
  hex: string;

	constructor(id: number) {
		this.id = id;
	}	

	static readonly WATER = 1;
	static readonly DESERT = 2;
	static readonly FOREST = 3;
	static readonly COSMOS = 4;
	static readonly UNKNOWN = 5;

}
