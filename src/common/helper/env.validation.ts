import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  // @IsEnum(Environment)
  // NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}