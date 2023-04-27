import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private emailService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
		
    const url = `example.com/auth/confirm?token=${token}`;

    await this.emailService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // filling curly brackets with content
        pseudo: user.pseudo,
        url,
      },
    });

		console.log('email sent1');
  }

}
