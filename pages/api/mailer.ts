// import * as key from 'data/nutt-net-id-7d3fae2fe850.json';
// import { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';

// const Mailer = async (req: NextApiRequest, res: NextApiResponse) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       type: 'OAuth2',
//       user: 'no-reply@nutt.co.id',
//       serviceClient: key.client_id,
//       privateKey: key.private_key,
//     },
//   });

//   try {
//     await transporter.verify();
//     await transporter.sendMail({
//       from: req.body.email,
//       // sender: req.body.email,
//       // replyTo: req.body.email,
//       to: 'info@jakfiber.id',
//       subject: `CS: ${req.body.subject}`,
//       // text: 'Kekirim lagi ndro!',
//       html: `
//       <!doctype html>
//       <html>
//         <head>
//           <meta name="viewport" content="width=device-width">
//           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//           <title>Simple Transactional Email</title>
//           <style>
//           /* -------------------------------------
//               INLINED WITH htmlemail.io/inline
//           ------------------------------------- */
//           /* -------------------------------------
//               RESPONSIVE AND MOBILE FRIENDLY STYLES
//           ------------------------------------- */
//           @media only screen and (max-width: 620px) {
//             table[class=body] h1 {
//               font-size: 28px !important;
//               margin-bottom: 10px !important;
//             }
//             table[class=body] p,
//                   table[class=body] ul,
//                   table[class=body] ol,
//                   table[class=body] td,
//                   table[class=body] span,
//                   table[class=body] a {
//               font-size: 16px !important;
//             }
//             table[class=body] .wrapper,
//                   table[class=body] .article {
//               padding: 10px !important;
//             }
//             table[class=body] .content {
//               padding: 0 !important;
//             }
//             table[class=body] .container {
//               padding: 0 !important;
//               width: 100% !important;
//             }
//             table[class=body] .main {
//               border-left-width: 0 !important;
//               border-radius: 0 !important;
//               border-right-width: 0 !important;
//             }
//             table[class=body] .btn table {
//               width: 100% !important;
//             }
//             table[class=body] .btn a {
//               width: 100% !important;
//             }
//             table[class=body] .img-responsive {
//               height: auto !important;
//               max-width: 100% !important;
//               width: auto !important;
//             }
//           }

//           /* -------------------------------------
//               PRESERVE THESE STYLES IN THE HEAD
//           ------------------------------------- */
//           @media all {
//             .ExternalClass {
//               width: 100%;
//             }
//             .ExternalClass,
//                   .ExternalClass p,
//                   .ExternalClass span,
//                   .ExternalClass font,
//                   .ExternalClass td,
//                   .ExternalClass div {
//               line-height: 100%;
//             }
//             .apple-link a {
//               color: inherit !important;
//               font-family: inherit !important;
//               font-size: inherit !important;
//               font-weight: inherit !important;
//               line-height: inherit !important;
//               text-decoration: none !important;
//             }
//             #MessageViewBody a {
//               color: inherit;
//               text-decoration: none;
//               font-size: inherit;
//               font-family: inherit;
//               font-weight: inherit;
//               line-height: inherit;
//             }
//             .btn-primary table td:hover {
//               background-color: #ff395a !important;
//             }
//             .btn-primary a:hover {
//               background-color: #ff395a !important;
//               border-color: #ff395a !important;
//             }
//           }
//           </style>
//         </head>
//         <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
//           <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"><!-- pre header disini --></span>
//           <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
//             <tr>
//               <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
//               <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
//                 <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

//                   <!-- START CENTERED WHITE CONTAINER -->
//                   <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

//                     <!-- START MAIN CONTENT AREA -->
//                     <tr>
//                       <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
//                         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
//                           <tr>
//                             <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
//                               <table border="0" cellpadding="0" cellspacing="0" class="m_34693095999324642btn-primary" style="border-collapse:separate;width:100%;box-sizing:border-box">
//                                 <tbody>
//                                   <tr>
//                                     <td align="left" style="font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom: 30px;">
//                                       <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:auto;margin: 0 auto;">
//                                         <tbody>
//                                           <tr>
//                                             <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:center;"> <img src="https://www.jakfiber.id/images/logo-jakfiber.png" style="width: 220px;"> </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>

//                               <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Halo Tim NUTT,</p>
//                               <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Ada pesan dari pengunjung website Jakfiber.id nih:</p>
//                               <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
//                                 <tr>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px; width: 15%;">
//                                     Nama
//                                   </td>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 0 0 15px 7px;">
//                                     ${req.body.name}
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
//                                     Email
//                                   </td>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 0 0 15px 7px;">
//                                     ${req.body.email}
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
//                                     Telepon&nbsp;
//                                   </td>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 0 0 15px 7px;">
//                                     ${req.body.phone}
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
//                                     Pesan
//                                   </td>
//                                   <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 0 0 15px 7px; white-space: pre-line;">
//                                     ${req.body.message}
//                                   </td>
//                                 </tr>
//                               </table>
//                               <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
//                                 <tbody>
//                                   <tr>
//                                     <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
//                                       <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto; margin: 0 auto;">
//                                         <tbody>
//                                           <tr>
//                                             <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #ff2c9c; border-radius: 5px; text-align: center;"> <a href="mailto:${req.body.email}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #ff2c9c; border: solid 1px #ff2c9c; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize;">Balas</a> </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                         </table>
//                       </td>
//                     </tr>

//                   <!-- END MAIN CONTENT AREA -->
//                   </table>

//                   <!-- START FOOTER -->
//                   <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
//                     <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
//                       <tr>
//                         <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
//                           Powered by <a href="http://www.nutt.co.id" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Jakfiber</a>.
//                         </td>
//                       </tr>
//                     </table>
//                   </div>
//                   <!-- END FOOTER -->

//                 <!-- END CENTERED WHITE CONTAINER -->
//                 </div>
//               </td>
//               <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
//             </tr>
//           </table>
//         </body>
//       </html>
//       `,
//     });

//     res.statusCode = 200;
//     res.json({ message: 'Pesan Terkirim!' });
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({ message: err });
//   }
// };

// export default Mailer;
// eslint-disable-next-line prettier/prettier
export {};
