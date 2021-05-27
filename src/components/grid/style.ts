import { css } from 'linaria';
import { styled } from 'linaria/react';
import { breakpoints, gridLayout } from 'styles/breakpoints';

const breakPointPrev = (
  name: string,
  gridLayoutObject = gridLayout,
  breakPointNames = Object.keys(gridLayoutObject),
): number | null => {
  const n = breakPointNames.indexOf(name);

  if (n !== -1 && n > 0) {
    return n - 1;
  }
  return null;
};

const breakPointMax = (name: string, gridLayoutObject = gridLayout): any => {
  const prev = breakPointPrev(name, gridLayoutObject);
  const corilationValue = 0.02; // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
  if (prev !== null && prev > -1) {
    return `${parseInt(gridLayoutObject[name].break, 10) - corilationValue}px`;
  }
  return null;
};

const mediaBreakPointDown = (name, gridLayoutObject = gridLayout, content): any => {
  const max = breakPointMax(name, gridLayoutObject);

  if (max) {
    return {
      [`@media (max-width: ${max})`]: {
        ...content,
      },
    };
  }
  return {
    ...content,
  };
};

const mediaQueriesForRow = () => {
  let mediaQueries = {};
  Object.keys(gridLayout).forEach((key) => {
    const { gutter } = gridLayout[key];
    const content = {
      margin: `0 calc((-1/2)*${gutter})`,
    };
    mediaQueries = {
      ...mediaQueries,
      ...mediaBreakPointDown(key, gridLayout, content),
    };
  });
  return mediaQueries;
};

const mediaQueriesForColumn = () => {
  let mediaQueries = {
    '&.col-auto': {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%',
      // padding: `16px`,
    },
  };
  Object.keys(gridLayout).forEach((key) => {
    const max = breakPointMax(key, gridLayout);
    const breakpoint = `@media (max-width: ${max})`;
    for (let i = 1; i <= gridLayout[key].gridSize; i += 1) {
      const hasBreakpoint = Object.prototype.hasOwnProperty.call(mediaQueries, breakpoint);
      const width = `${Math.round((i / 12) * 10e7) / 10e5}%`;
      const content = {
        [`&.col-${key}-${i}`]: {
          // padding: `calc(${gridLayout[key].gutter}/2)`,
          // width: `calc(100/${gridLayout[key].gridSize}*${i}*1%)`,
          flexBasis: width,
          flexGrow: 0,
          maxWidth: width,
        },
      };
      const breakpointObject = mediaBreakPointDown(key, gridLayout, content);

      if (max && hasBreakpoint) {
        mediaQueries = {
          ...mediaQueries,
          [breakpoint]: {
            ...mediaQueries[breakpoint],
            ...breakpointObject[breakpoint],
          },
        };
      } else {
        mediaQueries = {
          ...mediaQueries,
          ...breakpointObject,
        };
      }
    }
  });

  return mediaQueries;
};

const mediaQueriesForContainer = () => {
  let mediaQueries = {};
  Object.keys(gridLayout).forEach((key) => {
    const content = {
      padding: `0 calc(${gridLayout[key].gutter || '24px'})`,
    };
    mediaQueries = {
      ...mediaQueries,
      ...mediaBreakPointDown(key, gridLayout, content),
    };
  });

  return {
    ...mediaQueries,
    // [`@media (min-width: ${960 + 2 * parseInt(gridLayout.l.gutter, 10)}px)`]: {
    //   padding: `0 calc(${gridLayout.l.gutter})`,
    // },
  };
};

const spacingForRow = () => {
  let spacingQueries = {};
  for (let i = 0; i <= 10; i += 1) {
    const content = {
      [`&.spacing-xs-${i}`]: {
        margin: `-${i * 4}px`,
        width: `calc(100% + ${i * 8}px)`,
        '& > div': {
          padding: `${i * 4}px`,
        },
      },
    };

    spacingQueries = {
      ...content,
      ...spacingQueries,
    };
  }
  return { ...spacingQueries };
};

export const container = css`
  width: ${breakpoints.xl};
  max-width: 100%;
  margin: 0 auto;
  ${mediaQueriesForContainer()};
`;

export const row = css`
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  ${mediaQueriesForRow()};
  /* margin: 0 -8px; */
`;

export const Row = styled.div`
  ${spacingForRow()};
`;

export const Col = styled.div`
  ${mediaQueriesForColumn()};
`;
