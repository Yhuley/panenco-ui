import { TableBuilder } from 'components';
import TableDocs from 'components/responsive-table/responsive-table-DOCS.md';
import TableReadme from 'components/responsive-table/responsive-table-README.md';
import React from 'react';

import { decorator } from '../../utils/decorator';
import { WrappedComponent } from '../helpers/wrapped';

export default decorator('TableBuilder', TableDocs, TableReadme).add('TableBuilder', () => {
  return (
    <WrappedComponent>
      <TableBuilder />
    </WrappedComponent>
  );
});
