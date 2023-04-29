import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Global()
@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}


// @Global()
// @Module({
//     imports: [
//       MailerModule.forRootAsync({
//         // imports: [ConfigModule], // import module if not enabled globally
//         useFactory: async (config: ConfigService) => ({
//           // transport: config.get("MAIL_TRANSPORT"),
//           // or
//           transport: {
//             host: config.get('MAIL_HOST'),
//             port: config.get('MAIL_PORT'),
//             secure: false,
//             auth: {
//               user: config.get('MAIL_USER'),
//               pass: config.get('MAIL_PASSWORD'),
//             },
//           },
//           defaults: {
//             from: `"No Reply" <${config.get('MAIL_FROM')}>`,
//           },
//           template: {
//             dir: join(__dirname, 'templates'),
//             adapter: new HandlebarsAdapter(),
//             options: {
//               strict: true,
//             },
//           },
//         }),
//         inject: [ConfigService],
//       }),
//     ],
//     providers: [EmailService],
//     exports: [EmailService],
//   })
//   export class EmailModule {}


// @Global()
// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: {
//         host: process.env.MAIL_HOST,
//         // port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 587,
//         port: 587,
//         secure: false, // upgrade later with STARTTLS
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASSWORD,
//         },
//       },
//       defaults: {
//         from: '"No Reply" <noreply@example.com>',
//       },
//       template: {
//         dir: join(__dirname, 'templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   providers: [EmailService],
//   exports: [EmailService],
// })
// export class EmailModule {}


// @Global()
// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: {
//         service: 'gmail',
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASSWORD,
//           clientId: process.env.CLIENT_ID,
//           clientSecret: process.env.CLIENT_SECRET,
//         }
//       },
//       defaults: {
//         from: '"No Reply" <noreply@example.com>',
//       },
//       template: {
//         dir: join(__dirname, 'templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   providers: [EmailService],
//   exports: [EmailService],
// })
// export class EmailModule {}
