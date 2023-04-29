import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class EmailService {

	private oAuth2Client;

	constructor() {
		this.oAuth2Client = new google.auth.OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			process.env.REDIRECT_URI
		);
		this.oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
	}

	async sendConfirmationLink(user: User, link: string) {
		try {
			const accessToken = await this.oAuth2Client.getAccessToken();
			const token = accessToken.token;

			if (token) {
				const transport = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						type: 'OAuth2',
						user: process.env.MAIL_USER,
						clientId: process.env.CLIENT_ID,
						clientSecret: process.env.CLIENT_SECRET,
						refreshToken: process.env.REFRESH_TOKEN,
						accessToken: token,
					},
				});

				// const link = `example.com/auth/confirm?token=${randomstring}`;

				const mailOptions = {
					from: '"No Reply" <noreply@example.com>',
					to: user.email,
					subject: 'Welcome to Nice App! Confirm your Email',
					text: `Hello ${user.pseudo}, Welcome in your new faction ... , click on this link to activate your profile: ${link}`, 
					html: `<h1>Hello ${user.pseudo},</h1> <p>Welcome in your new faction ... , click on this link to activate your profile: ${link}</p>`,
				};

				const result = await transport.sendMail(mailOptions);
				console.log(`Confirmation email sent to ${user.email}`);
				return result;
			}
			else {
				console.log(accessToken.res);
			}

		} catch (err) {
			console.log(err);
		}
	}

}
