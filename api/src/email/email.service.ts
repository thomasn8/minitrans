import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// const tokens = require('src/api_google/token.json');
let tokens = {
	access_token:"ya29.a0AWY7CkktfIaQf0iPxkpKQ1FNhHV3z8o4XjsSQy2L6Lo24_0e42pJDD_zCTGWYVZ4movtPmhGydumZkgTTFpUKGlio1Ere9b5On6XEWSMOOW2bDs5YLZ3f_pRfu-HpCa6mvM6RJHMSnekeAIgem4L6daWaXmmaCgYKAdESARISFQG1tDrpF6x2uoxUCuWzZ8I2oXbZQw0163",
	refresh_token:"1//09QMlW8H2J0tYCgYIARAAGAkSNwF-L9IrUOitOHK569SMq-ZtaLCJN4hg01tSM4GCTxptjAcFS0K4xuepBMFjDpJIkBiYmFvRoH8",
	scope:"https://www.googleapis.com/auth/gmail.send",
	token_type:"Bearer",
	expiry_date:1682763108987
};

@Injectable()
export class EmailService {

	private transporter: nodemailer.Transporter;

  // constructor(private emailService: MailerService) {
  constructor(private emailService: EmailService) {

		const oAuth2Client = new google.auth.OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			process.env.REDIRECT_URI
		);

		oAuth2Client.setCredentials(tokens);

		// // Generate the URL to authorize your app and get the authorization code
		// const authorizeUrl = oauth2Client.generateAuthUrl({
		// 	access_type: 'offline',
		// 	scope: ['https://www.googleapis.com/auth/gmail.send']
		// });

		// // Use the authorization code to get an access token and refresh token
		// const { tokens } = await oauth2Client.getToken('YOUR_AUTHORIZATION_CODE');
		// console.log(tokens.access_token); // access_token to provide
		// console.log(tokens.refresh_token); // refresh_token to provide

		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.MAIL_USER,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				accessToken: tokens.access_token,
				refreshToken: tokens.refresh_token,
				expires: tokens.expiry_date,
			},
		});
  }


	// private testAccount: nodemailer.TestAccount;
	// private transporter: nodemailer.Transporter;

  // constructor() {
	// 	nodemailer.createTestAccount()
  //     .then((account) => {
  //       this.testAccount = account;
  //       this.transporter = nodemailer.createTransport({
  //         host: "smtp.ethereal.email",
  //         port: 587,
  //         secure: false,
  //         auth: {
  //           user: this.testAccount.user,
  //           pass: this.testAccount.pass
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.error('Failed to create test account', err);
  //     });
  // }

  async sendUserConfirmation(user: User, token: string) {
    const mailOptions = {
      from: 'your-email@example.com',
      to: user.email,
      subject: 'Please confirm your email',
      text: `Please click on the following link to confirm your email: ${token}`,
      html: `Please click <a href="${token}">here</a> to confirm your email.`,
    };

		try {
			await this.transporter.sendMail(mailOptions);
		} catch (err) {
			console.log(err);
		}
  }





	// constructor(private emailService: MailerService) {}

  // async sendUserConfirmation(user: User, token: string) {
		
  //   const url = `example.com/auth/confirm?token=${token}`;

	// 	try {
	// 		await this.emailService.sendMail({
	// 			to: user.email,
	// 			// from: '"Support Team" <support@example.com>', // override default from
	// 			subject: 'Welcome to Nice App! Confirm your Email',
	// 			template: './confirmation', // `.hbs` extension is appended automatically
	// 			context: { // filling curly brackets with content
	// 				pseudo: user.pseudo,
	// 				url,
	// 			},
	// 		});
	// 	} catch (err) {
	// 		console.log('mail error:');
	// 		console.log(err);
	// 	}

	// 	console.log('email sent1');
  // }



}
