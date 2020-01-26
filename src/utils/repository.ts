import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { isUuid } from 'lodash-uuid';
import { notFound } from '@utils/validation';

interface updateOption {
  where: any;
  body: any;
  subQueryUpdate: string[];
  subQueryCreate: string[];
}

export const typeObject = (obj: any) => {
  if (isEmpty(obj)) return {};
  if (typeof obj === 'object') return obj;
  return JSON.parse(obj);
};

export const iLikeCase = (arr: any, obj: any, option: any) => {
  const objOption = typeObject(option);
  const { like, notEquals } = objOption;
  let isLike = like;
  let isNotEquals = notEquals;
  if (typeof like === 'string') isLike = like == 'true';
  if (typeof isNotEquals === 'string') isNotEquals = notEquals == 'true';

  return arr.map((d: any) => {
    const value = obj[d];
    if (isLike) {
      if (isUuid(value)) return { [d]: value };
      return { [d]: { [isNotEquals ? Op.notILike : Op.iLike]: `%${value}%` } };
    }
    return { [d]: isNotEquals ? { [Op.not]: value } : value };
  });
};

export const destructObj = (where: any, query: any) => {
  const obj = typeObject(where);
  const filter = Object.keys(obj).filter(d => typeof obj[d] !== 'object');
  return Object.assign({}, ...iLikeCase(filter, obj, query.option));
};

export const typeArray = (arr: any) => {
  if (isEmpty(arr)) return [];
  if (Array.isArray(arr)) return arr;
  return JSON.parse(arr);
};

export const includeOption = (repo: any, query: any) => {
  const { include, where, option } = query;
  const arrInclude = typeArray(include);
  const objWhere = typeObject(where);
  const relation = arrInclude.filter((d: any) => repo[d] !== undefined);
  const result = relation.map((d: string) => {
    let gen: any = { model: repo[d].model, as: d, required: repo[d].required };
    const obj = (objWhere && objWhere[d]) || {};
    const isWhere = iLikeCase(Object.keys(obj), obj, option);
    if (!isEmpty(isWhere)) gen.where = isWhere;
    return gen;
  });
  return result;
};

export const findOption = (repo: any, query: any) => ({
  where: destructObj(query.where, query),
  limit: query.limit || 10,
  offset: query.offset || 0,
  order: [['createdAt', 'DESC']],
  include: includeOption(repo, query),
});

export const findOptionWithAuth = (repo: any, query: any, user: any) => {
  const where = { ...destructObj(query.where, query), user };
  return findOption(repo, { ...query, where });
};

export const findOneOption = (repo: any, query: any) => ({
  where: query.param,
  include: includeOption(repo, query),
});

export const updateOption = (
  repo: any,
  entity: string,
  option: updateOption,
) => {
  const { where, body, subQueryUpdate, subQueryCreate } = option;
  const relationUpdate = subQueryUpdate.filter(
    (d: any) => repo[d] !== undefined && body[d] !== undefined,
  );
  const relationCreate = subQueryCreate.filter(
    (d: any) => repo[d] !== undefined && body[d] !== undefined,
  );
  return repo.sequelize.transaction(async (transaction: any) => {
    const [success, result] = await repo[entity].update(body, {
      where,
      returning: true,
      transaction,
    });
    notFound(success, 'can`t update');
    const resultSubUpdate = await Promise.all(
      relationUpdate.map(async (d: any) => {
        const [success, result] = await repo[d].update(body[d], {
          where: { [entity]: where.id },
          returning: true,
          transaction,
        });
        notFound(success, 'can`t update');
        return { [d]: result[0] };
      }),
    );
    const resultSubCreate = await Promise.all(
      relationCreate.map(async (d: any) => {
        const obj = body[d].map((d: any) => {
          return { [entity]: where.id, ...d };
        });
        const result = await repo[d].bulkCreate(obj, { transaction });
        notFound(success, 'can`t update');
        return { [d]: result };
      }),
    );
    return {
      ...result[0].dataValues,
      ...Object.assign({}, ...resultSubUpdate),
      ...Object.assign({}, ...resultSubCreate),
    };
  });
};
