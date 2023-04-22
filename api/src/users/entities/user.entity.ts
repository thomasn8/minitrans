import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserDto } from 'src/_shared_dto/user.dto';
import { Element } from 'src/elements/entities/element.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

	@Column({ select: false })
	password: string; 

	@CreateDateColumn()
	createDate: Date;

  @Column()
  pseudo: string;

	// @Column()
	@ManyToOne(() => Element)
  element: number;

  // @Column({ default: true })
  // isActive: boolean;

	toUserDto(): UserDto {
		return {
				id: this.id,
				email: this.email,
				pseudo: this.pseudo,
				element: this.element
		}
	}

}
