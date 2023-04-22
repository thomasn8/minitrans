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

	constructor(name: string, colorName: string, rgb:string, hex: string) {
		this.name = name;
		this.colorName = colorName;
		this.rgb = rgb;
		this.hex = hex;
	}

	static readonly WATER = 1;
	static readonly DESERT = 2;
	static readonly FOREST = 3;
	static readonly SPACE = 4;
	static readonly Unknown = 5;

	static readonly BLUE = 1;
	static readonly ORANGE = 2;
	static readonly GREEN = 3;
	static readonly PURPLE = 4;
	static readonly GREY = 5;

}
