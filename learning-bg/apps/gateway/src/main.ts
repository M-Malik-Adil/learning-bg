/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

import { Response, Request } from 'express';
import basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayModule } from './app/gateway.module';
import { PublicGatewayModule } from './app/public.gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  const config = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin:true,
    credentials:true
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));


  if(config.get('NODE_ENV') === 'production'){
    app.use(['/api'], basicAuth({
      challenge: true,
      users:{
        [config.get('SWAGGER_USER_NAME')]:config.get('SWAGGER_PASSWORD')
      }
    }))
  }

  app.disable('x-powered-by');
  app.disable('etag');
  app.getHttpAdapter().get('/', (req:Request, res:Response) => {
    return res.redirect('/health-check/views');
  })

  /* Added HTML Renderer Engine & Configurations */
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, 'assets', 'public'));
  app.setBaseViewsDir(join(__dirname, 'assets', 'views'));


// Set up Swagger
  const internalOptions = new DocumentBuilder()
  .setTitle('Air Apple Cart')
  .setDescription('The Gateway API description')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, internalOptions,{
    include: [GatewayModule],
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {persistAuthorization: true},
  });

  // Second Swagger setup for public API
  const publicConfig = new DocumentBuilder()
  .setTitle('Air Apple Cart Public API')
  .setVersion('1.0')
  .build();

  const publicDocument = SwaggerModule.createDocument(app, publicConfig,{
    include: [PublicGatewayModule],
  });

  SwaggerModule.setup('public/api', app, publicDocument, {
    swaggerOptions: {persistAuthorization: true},
  });




  await app.listen(config.get('API_GATEWAY_PORT'));
  Logger.log(`🚀 Application is running on: http://localhost:${config.get('API_GATEWAY_PORT')}`);
}

bootstrap();
