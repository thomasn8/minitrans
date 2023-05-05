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

	async sendConfirmationLink(user: User, element: string, confirmToken: string) {
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

				const app_name = process.env.APP_NAME;
				let domain_name = undefined;
				process.env.BUILD_TYPE === "Production" ? domain_name = process.env.DOMAIN_NAME : domain_name = process.env.DEV_DOMAIN_NAME;
				const link = `${domain_name}/signin-confirm?token=${confirmToken}`;

				const mailOptions = {
					from: '"No Reply" <noreply@example.com>',
					to: user.email,
					subject: `Welcome to ${app_name}! Confirm your Email`,
					text: `${user.pseudo},\n Welcome into your new faction: the ${element}! Click on this link to activate your profile:\n ${link}`, 
					html: `<h1>${user.pseudo},</h1> <p>Welcome into your new faction <b>the ${element}</b>! Click on this link to activate your profile:<br /> ${link}</p>`,
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
