import { isEmpty } from 'lodash';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const filterObjUndefined = (obj: any) => {
  const filter = Object.keys(obj).filter(d => obj[d] !== undefined);
  const arr = filter.map(d => ({ [d]: obj[d] }));
  return Object.assign({}, ...arr);
};

export const notFound = (data: any, message: string) => {
  if (!data) throw new NotFoundException(message || 'not found');
};

export const badRequest = (data: any, message: string) => {
  if (data) throw new BadRequestException(message || 'bad request');
};

export const alreadyExistsException = async (
  repo: any,
  obj: any,
  message: string,
) => {
  let pass: any;
  const pureObj = filterObjUndefined(obj);
  if (!isEmpty(pureObj)) pass = await repo.findOne({ where: pureObj });
  if (!isEmpty(pass))
    throw new BadRequestException(
      message || `${Object.keys(obj)[0]} already exists`,
    );
  return true;
};

export const notFoundException = async (
  repo: any,
  obj: any,
  message: string,
) => {
  let pass: any;
  const pureObj = filterObjUndefined(obj);
  if (!isEmpty(pureObj)) pass = await repo.findOne({ where: pureObj });
  if (isEmpty(pass))
    throw new NotFoundException(message || `${Object.keys(obj)[0]} not found`);
  return pass;
};

export const alreadyExistsMaxSize = (num: number, max: number) => {
  if (num > max) throw new BadRequestException('already exists over max size');
};
