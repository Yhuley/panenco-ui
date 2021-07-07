// import { primary } from './../../../lib/styles/colors.d';
import { styled } from 'linaria/react';

export const StyledTable = styled.div`
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
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      // background-color: #fff;
      margin: 0;
      overflow: hidden;

      padding: 0.5rem;
      border-bottom: 1px solid #cfd8dc;
      border-right: 1px solid #cfd8dc;

      :last-child {
        border-right: 0;
      }
      input {
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
      padding: 16px;
    }
  }

  .pagination {
    padding: 0.5rem;
  }
  .thContainer {
    display: flex;
    justify-content: space-between;
  }
  .controls {
    color: ${(props: any): string => props.theme.colors.light};
  }
`;
