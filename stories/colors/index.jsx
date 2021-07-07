import React from 'react';
import { Row, Col } from 'components';
import { useTheme } from 'utils/hooks';
import { decorator } from '../../utils/decorator';
import { WrappedComponent } from '../helpers/wrapped';
import ColorsDocs from './DOCS.md';
import README from './README.md';

export default decorator('Colors', ColorsDocs, README).add('Colors', () => {
  const theme = useTheme();

  return (
    <WrappedComponent>
      <Row>
        {Object.keys(theme.colors.lightMode).map((color) => (
          <Col md="2" key={color}>
            <div>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: theme.colors.lightMode[color],
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              {`${color}: ${theme.colors.lightMode[color]}`}
            </div>
          </Col>
        ))}
      </Row>
    </WrappedComponent>
  );
});
