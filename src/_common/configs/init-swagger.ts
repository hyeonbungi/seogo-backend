import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export default function initSwagger(app: INestApplication) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('서고(Seogo) API 문서')
    .setDescription('서고(Seogo) 서비스 개발을 위해 제공되는 API 문서입니다.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    explorer: false,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  };

  SwaggerModule.setup('docs', app, document, options);
}
