import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  console.log(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });
  app.use('/admin*', function (req, res, next) {
    if (req.session.user && req.session.user.role == 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  });
  app.use('/account*', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  const config = new DocumentBuilder()
    .setTitle('Online Store')
    .setDescription('The OnlineStore API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
