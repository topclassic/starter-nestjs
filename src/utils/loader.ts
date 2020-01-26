import requireAll from 'require-all';

export const loader = (dirname: String, filter: RegExp): any => {
  var path = requireAll({
    dirname,
    filter,
  });
  const loadPath = Object.assign(
    {},
    ...(function _flatten(o) {
      return [].concat(
        ...Object.keys(o).map(k =>
          typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] },
        ),
      );
    })(path),
  );
  return Object.values(loadPath);
};
