import * as React from 'react';
import cx from 'classnames';

import { useMode, useTheme } from 'utils/hooks';
import { Icon } from 'components/icon';
import { Text } from 'components/text';

import { StyledDropdown } from './style';

export type ColumnProps = {
  id: string;
  minWidth: number;

  width: number;
  Header: string;
  visibility: object;
  accessor: string;
  lock: boolean;
  validation: string;
  mandatory: boolean;
};

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  column: ColumnProps;
  modifyProperty: (modifiedProperty) => void;
  hideDropdown: () => void;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, style, column, modifyProperty, hideDropdown }: DropdownProps) => {
    const theme = useTheme();
    const { mode } = useMode();

    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const handleOutsideClick = (event): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && dropdownRef !== event.target) {
        hideDropdown();
      }
    };

    React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return (): void => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);

    return (
      <StyledDropdown className={cx('Dropdown', className)} theme={theme} mode={mode} ref={dropdownRef} style={style}>
        <div className="buttonGroup">
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.editPen} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Edit properties</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.duplicate} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Duplicate column</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.sun} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Mark as optional</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.unseen} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Hide</Text>
          </button>
          <button
            type="button"
            className="buttonGroupItem"
            onClick={(): void => modifyProperty({ lock: !column.lock })}
          >
            <Icon icon={Icon.icons.lock} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Lock</Text>
          </button>
        </div>
        <div className="buttonGroup">
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.chevronLeft} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Mode left</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.chevronRight} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Move right</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.chevronDown} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Sort A-Z</Text>
          </button>
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.chevronUp} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Sort Z-A</Text>
          </button>
        </div>
        <div className="buttonGroup">
          <button type="button" className="buttonGroupItem">
            <Icon icon={Icon.icons.unseen} className="thContainerIcon" />
            <Text size={theme.typography.sizes.m}>Delete</Text>
          </button>
        </div>
      </StyledDropdown>
    );
  },
);
