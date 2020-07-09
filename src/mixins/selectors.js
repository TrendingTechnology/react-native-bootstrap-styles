// selectors accept raw loop param(s) or booleans

export const selectorCondition = (condition, styleTrue = {}, styleFalse = {}) => (
  condition ? styleTrue : styleFalse
);

export const selectorFirstChild = (indexOrBool, style = {}) => (
  typeof value === 'boolean' ? (
    indexOrBool ? style : {}
  ) : (
    indexOrBool == 0 ? style : {}
  )
);

export const selectorLastChild = (indexOrBool, lengthOrStyle = {}, style = {}) => (
  arguments.length < 3 ? (
    indexOrBool ? style : {}
  ) : (
    indexOrBool == lengthOrStyle - 1 ? style : {}
  )
);

export const selectorNextChild = (indexOrBool, style = {}) => (
  typeof value === 'boolean' ? (
    indexOrBool ? style : {}
  ) : (
    indexOrBool > 0 ? style : {}
  )
);

export const selectorPreviousChild = (indexOrBool, lengthOrStyle = {}, style = {}) => (
  arguments.length < 3 ? (
    indexOrBool ? lengthOrStyle : {}
  ) : (
    indexOrBool < lengthOrStyle - 1 ? style : {}
  )
);

// OBSOLETED
// bool makes no sense here, in fact
// export const selectorNthChild = (index, condition, style = {}) => (
//   condition(index) ? style : {}
// );

// experimental
export function getSelectors(constants, classes) {

  const {
    SCREENS,
    GRID_BREAKPOINTS,
    ORIENTATION_PORTRAIT,
    ORIENTATION_LANDSCAPE,
  } = constants;

  const _selectors = {
    // pass
  };

  // selectorMediaUp%screen, / ex: selectorMediaUpMd
  // selectorMediaDown%screen, / ex: selectorMediaDownMd
  const SCREENS_INFIXES_ALL = Object.keys(GRID_BREAKPOINTS);

  SCREENS_INFIXES_ALL.forEach((item) => {
    _selectors['selectorMediaUp' + item] = (
      SCREENS.indexOf(item) > -1 ? style => style : style => {}
    );
  });

  SCREENS_INFIXES_ALL.forEach((item) => {
    _selectors['selectorMediaDown' + item] = (
      SCREENS.indexOf(item) > - 1 && SCREENS.indexOf(item) < SCREENS.length - 1 ? style => style : style => {}
    );
  });

  _selectors['selectorMediaPortrait'] = ORIENTATION_PORTRAIT ? style => style : style => {};
  _selectors['selectorMediaLandscape'] = ORIENTATION_LANDSCAPE ? style => style : style => {};

  return {
    selectorCondition,
    selectorFirstChild,
    selectorLastChild,
    selectorNextChild,
    selectorPreviousChild,
    ..._selectors
  }
}