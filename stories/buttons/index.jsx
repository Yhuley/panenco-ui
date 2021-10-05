import { Button, ButtonIcon, Col, Icon, PrimaryButton, Row, SecondaryButton, Text } from 'components';
import ButtonIconDocs from 'components/button-icon/icon-button-DOCS.md';
import ButtonIconReadme from 'components/button-icon/icon-button-README.md';
import ButtonDocs from 'components/button/button-DOCS.md';
import ButtonReadme from 'components/button/button-README.md';
import LinkDocs from 'components/button/link-DOCS.md';
import LinkReadme from 'components/button/link-README.md';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { sizes, weights } from 'styles';

import { decorator } from '../../utils/decorator';
import { WrappedComponent } from '../helpers/wrapped';

export default decorator('Button', ButtonDocs, ButtonReadme).add('Button component', () => {
  return (
    <WrappedComponent>
      <div style={{margin: "20px 0"}}>
        <Text size={sizes.l} weight={weights.bold}>Variants:</Text>
        <Row spacing={1}>
          <Col>
            <Button>Button</Button>
          </Col>
          <Col>
            <PrimaryButton>Primary Button</PrimaryButton>
          </Col>
          <Col>
            <SecondaryButton>Secondary Button</SecondaryButton>
          </Col>
        </Row>
      </div>
      <div style={{margin: "20px 0"}}>
        <Text size={sizes.l} weight={weights.bold}>Disabled:</Text>
        <Row spacing={1}>
          <Col>
            <Button disabled>Button</Button>
          </Col>
          <Col>
            <PrimaryButton disabled>Primary Button</PrimaryButton>
          </Col>
          <Col>
            <SecondaryButton disabled>Secondary Button</SecondaryButton>
          </Col>
        </Row>
      </div>
      <div style={{margin: "20px 0"}}>
        <Text size={sizes.l} weight={weights.bold}>Loading:</Text>
        <Row spacing={1}>
          <Col>
            <Button isLoading>Button</Button>
          </Col>
          <Col>
            <PrimaryButton isLoading>Primary Button</PrimaryButton>
          </Col>
          <Col>
            <SecondaryButton isLoading>Secondary Button</SecondaryButton>
          </Col>
        </Row>
      </div>
      <div style={{margin: "20px 0"}}>
        <Text size={sizes.l} weight={weights.bold}>Icons:</Text>
        <Row spacing={1}>
          <Col>
            <Button iconRight icon={Icon.icons.chevronRight}>Icon right</Button>
          </Col>
          <Col>
            <PrimaryButton iconRight icon={Icon.icons.chevronRight}>Icon right</PrimaryButton>
          </Col>
          <Col>
            <SecondaryButton iconRight icon={Icon.icons.chevronRight}>Icon right</SecondaryButton>
          </Col>
        </Row>
        <Row spacing={1}>
          <Col>
            <Button iconLeft icon={Icon.icons.chevronLeft}>Icon left</Button>
          </Col>
          <Col>
            <PrimaryButton iconLeft icon={Icon.icons.chevronLeft}>Icon left</PrimaryButton>
          </Col>
          <Col>
            <SecondaryButton iconLeft icon={Icon.icons.chevronLeft}>Icon left</SecondaryButton>
          </Col>
        </Row>
      </div>
    </WrappedComponent>
  );
});

export const LinkDecorator = decorator('Button', LinkDocs, LinkReadme).add('Link', () => {
  return (
    <BrowserRouter>
      <WrappedComponent>
        <Row style={{ justifyContent: 'center' }}>
          <Col m="3" l="3">
            <Button component="link">Link</Button>
            <Button component="link" disabled>
              Link disabled
            </Button>
            <Button component="a" href="mailto:info@panenco.com?subject=Secret subject">
              Link external
            </Button>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Col m="3" l="3">
            <PrimaryButton component="link" to="/">
              Primary Link
            </PrimaryButton>
            <PrimaryButton component="link" disabled>
              Primary Link disabled
            </PrimaryButton>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          <Col m="3" l="3">
            <SecondaryButton component="link">Link Button</SecondaryButton>
            <SecondaryButton component="link" disabled>
              Link Disabled
            </SecondaryButton>
          </Col>
        </Row>
      </WrappedComponent>
    </BrowserRouter>
  );
});

export const ButtonIcons = decorator('Button', ButtonIconDocs, ButtonIconReadme).add('Button icon components', () => {
  return (
    <BrowserRouter>
      <WrappedComponent>
        <div style={{margin: "20px 0"}}>
          <Row spacing={1}>
            <Col xs="12" sm="6">
              <ButtonIcon icon={Icon.icons.trash}>Button Icon</ButtonIcon>
            </Col>
            <Col xs="12" sm="6">
              <ButtonIcon iconLeft={Icon.icons.trash}>Button Icon Left</ButtonIcon>
            </Col>
            <Col xs="12" sm="6">
              <ButtonIcon icon={Icon.icons.lock}>Button Icon</ButtonIcon>
            </Col>
            <Col xs="12" sm="6">
              <ButtonIcon iconLeft={Icon.icons.lock}>Button Icon Left</ButtonIcon>
            </Col>
          </Row>
        </div>
      </WrappedComponent>
    </BrowserRouter>
  );
});
