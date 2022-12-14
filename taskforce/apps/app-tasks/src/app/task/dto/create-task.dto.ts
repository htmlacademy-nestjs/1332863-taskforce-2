import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsMongoId,
  IsISO8601,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsArray,
  Length,
  IsNumber,
  Min,
  ArrayMaxSize,
} from 'class-validator';
import {
  TASK_TITLE_NOT_VALID,
  TASK_DESCRIPTION_NOT_VALID,
  DEADLINE_DATE_NOT_VALID,
  TAGS_NOT_VALID,
  MAX_TAGS_COUNT,
  MIN_TAG_LENGTH,
  MAX_TAG_LENGTH,
  TAGS_СONTAIN_INVALID_SIMBOLS
} from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Создать работающий экземпляр термоядерной установки',
  })
  @IsString()
  @Matches(/\S/)
  @Length(20, 50, { message: TASK_TITLE_NOT_VALID })
  public title!: string;

  @ApiProperty({
    description: 'Task description',
    example:
      'Для ядерного синтеза допускается использование дейтерия и трития, или же изотопа гелия — гелий-3',
  })
  @IsString()
  @Matches(/\S/)
  @Length(100, 1024, { message: TASK_DESCRIPTION_NOT_VALID })
  public description!: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Очумелые ручки',
  })
  @IsString()
  @Matches(/\S/)
  public category!: string;

  @ApiProperty({
    description: 'Task price',
    example: '100500',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2022-12-22',
  })
  @IsOptional()
  @IsISO8601({message: DEADLINE_DATE_NOT_VALID})
  public deadline?: string;

  @ApiProperty({
    description: 'Task image',
    example: 'ITER.png',
  })
  @IsOptional()
  @IsString()
  public image?: string;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва, Кремль, дом 1',
  })
  @IsOptional()
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: 'Изичная задача, Задача на раз плюнуть',
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_TAGS_COUNT)
  @MinLength(MIN_TAG_LENGTH, {each: true})
  @MaxLength(MAX_TAG_LENGTH, {each: true})
  @IsString({each: true, message: TAGS_NOT_VALID})
  @Matches(/^[a-zа-яё][a-zа-яё0-9-]+$/i, {each: true, message: TAGS_СONTAIN_INVALID_SIMBOLS})
  public tags?: string[];

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6385aaacc05cd5e757d37764',
  })
  @IsMongoId()
  public userId!: string;
}
