import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { UserDto } from 'src/_shared_dto/user.dto';
import { Element } from 'src/elements/entities/element.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

	@Column({ select: false })
	password: string; 

	@CreateDateColumn({ select: false })
	createDate: Date;

	@Column({ default: false, select: false })
  confirmation: boolean;

	@Column({ select: false })
  confirmationToken: string;

	@UpdateDateColumn({ select: false })
	confirmationDate: Date;

  @Column({ unique: true })
  pseudo: string;

	@ManyToOne(() => Element)
  element: Element;

	toUserDto(): UserDto {
		return {
			id: this.id,
			email: this.email,
			pseudo: this.pseudo,
			element: this.element
		}
	}

}
