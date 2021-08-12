import { styled } from 'linaria/react';
import { PUITheme, ThemeMode } from 'utils/types';

export const StyledDropdown = styled.div<{
  mode: ThemeMode;
  theme: PUITheme;
}>`
  background-color: ${(props: any): string => props.theme.colors.light};
  border: 1px solid #cfd8dc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 8px 0;
  position: absolute;
  padding: 16px;
  width: 272px;
  z-index: 1;

  .buttonGroup {
    &Item {
      align-items: center;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;

      &:not(:first-child) {
        margin-top: 16px;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid #cfd8dc;
      padding-bottom: 16px;
    }

    &:not(:first-child) {
      padding-top: 16px;
    }
  }
`;

export const StyledTable = styled.div<{
  mode: ThemeMode;
  theme: PUITheme;
}>`
  overflow: scroll;

  .newColumn {
    position: absolute;
    top: 0;
  }

  .newRow {
    position: sticky;
    left: 0;
  }

  table {
    border-spacing: 0;
    border: 1px solid #cfd8dc;
    position: relative;
    tr {
      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      // background-color: #fff;
      border-bottom: 1px solid #cfd8dc;
      border-right: 1px solid #cfd8dc;
      margin: 0;
      min-height: 56px;
      overflow: hidden;
      // padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
      input {
        background: transparent;
        color: inherit;
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        width: -webkit-fill-available;
      }

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        // background: blue;
        width: 4px;
        position: absolute;
        right: 0;
        top: 4px;
        bottom: 4px;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        // &.isResizing {
        //   background: red;
        // }
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      // [data-sticky-last-left-td] {
      //   box-shadow: 2px 0px 3px #ccc;
      // }

      // [data-sticky-first-right-td] {
      //   box-shadow: -2px 0px 3px #ccc;
      // }
    }

    th {
      background-color: ${(props: any): string => props.theme.colors.primary};
      color: ${(props: any): string => props.theme.colors.light};
      overflow: visible;
      padding: 8px 16px;
      position: relative;
    }

    td {
      .tdContent {
        align-items: center;
        border: 2px solid transparent;
        display: flex;
        height: 100%;
        padding: 8px 16px;

        &Locked {
          background-color: ${(props: any): string => props.theme.colors.background};
          color: ${(props: any): string => props.theme.colors.secondary};
        }
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }

  .thContainer {
    align-items: center;
    display: flex;
    height: 100%;

    &Icon {
      margin-right: 10px;
      height: 16px;
      width: 16px;
    }

    &Header {
      display: flex;
      flex-direction: column;
      text-align: left;
      white-space: nowrap;
      width: 100%;
    }

    &Settings {
      color: ${(props: any): string => props.theme.colors.light};
    }
  }

  .controls {
    color: ${(props: any): string => props.theme.colors.light};
  }

  .popupButton {
    width: 100%;
  }
`;
