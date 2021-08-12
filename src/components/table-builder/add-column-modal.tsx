import { Col, Popup, Row, SecondaryButton, SelectInput, TextInput } from 'components';
import { PrimaryButton } from 'components/button';
import * as React from 'react';

const typeOptions = [
  {
    label: 'Info',
    value: 'info',
  },
  {
    label: 'Input',
    value: 'input',
  },
];

const validationTypeOptions = [
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Numeric',
    value: 'numeric',
  },
];
const mandatoryOptions = [
  {
    label: 'Mandatory',
    value: true,
  },
  {
    label: 'Optional',
    value: false,
  },
];
const visibilityOptions = [
  {
    label: 'Visible',
    value: true,
  },
  {
    label: 'Not visible',
    value: false,
  },
];

export const ColumnCreationModal = ({ setModalOpen, handleColumnsCreation, modalOpen }) => {
  const [type, setType] = React.useState(typeOptions[0]);
  const [validationType, setValidationType] = React.useState(validationTypeOptions[0]);
  const [mandatory, setMandatory] = React.useState(mandatoryOptions[0]);
  const [visibility, setVisibility] = React.useState(visibilityOptions[0]);
  const [columnName, setColumnName] = React.useState('');
  return (
    <Popup onHide={() => setModalOpen(false)} show={modalOpen} title="Add new column">
      <Row>
        <Col>
          <TextInput title="Column name" onChange={(e) => setColumnName(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectInput title="Column type" options={typeOptions} value={type} onChange={(option) => setType(option)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectInput
            title="Column validation type"
            options={validationTypeOptions}
            value={validationType}
            onChange={(option) => setValidationType(option)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {type.value === 'info' ? (
            <SelectInput
              title="Visibility"
              options={visibilityOptions}
              value={visibility}
              onChange={(option) => setVisibility(option)}
            />
          ) : (
            <SelectInput
              title="Mandatory/optional"
              options={mandatoryOptions}
              value={mandatory}
              onChange={(option) => setMandatory(option)}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <SecondaryButton style={{ width: '100%' }} onClick={() => setModalOpen(false)}>
            Cancel
          </SecondaryButton>
        </Col>
        <Col>
          <PrimaryButton
            style={{ width: '100%' }}
            onClick={() => {
              handleColumnsCreation({
                Header: `Column ${columnName}`,
                accessor: `createdCol${columnName}`,
                type: type.value,
                validationType: validationType.value,
                mandatory: mandatory.value,
                visibility: visibility.value,
                columnName,
              });
              setModalOpen(false);
            }}
          >
            Add column
          </PrimaryButton>
        </Col>
      </Row>
    </Popup>
  );
};
