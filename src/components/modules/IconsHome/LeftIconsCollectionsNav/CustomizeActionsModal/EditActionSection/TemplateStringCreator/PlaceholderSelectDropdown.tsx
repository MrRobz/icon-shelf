import { FC } from 'react';
import { ReactComponent as CheveronDownIcon } from 'assets/icons/cheveron-down.svg';
import { ReactComponent as CheveronRightIcon } from 'assets/icons/cheveron-right.svg';
import './styles.css';

import MultiDropdown, {
  Dropdown as DropdownType,
} from 'react-multilevel-dropdown';
import { editorFunctionOptions } from 'components/ui/TemplateEditor/autocomplete';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dropdown = MultiDropdown as any as typeof DropdownType;

export const PlaceholderSelectDropdown: FC = () => {
  const handleClick = (type: string, value: string) => {
    const trigger = document.querySelector(
      '.template-editor-placeholder-dropdown--button'
    ) as HTMLElement;

    trigger?.click();
  };

  return (
    <Dropdown
      title={
        <>
          Insert
          <CheveronDownIcon />
        </>
      }
      buttonClassName="template-editor-placeholder-dropdown--button btn-default"
      wrapperClassName="template-editor-placeholder-dropdown--dropdown"
      menuClassName="template-editor-placeholder-dropdown--menu"
      position="right"
    >
      <Dropdown.Item>
        <div className="w-full">Variable</div>
        <CheveronRightIcon className="float-right" />

        <Dropdown.Submenu position="right">
          <Dropdown.Item onClick={() => handleClick('variable', 'iconName')}>
            Icon name
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleClick('variable', 'iconRelativeFilePath')}
          >
            Icon relative file path
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleClick('variable', 'iconAbsoluteFilePath')}
          >
            Icon absolute file path
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleClick('variable', 'iconFileType')}
          >
            Icon file type
          </Dropdown.Item>
        </Dropdown.Submenu>
      </Dropdown.Item>

      <Dropdown.Item>
        <div className="w-full">Function</div>
        <CheveronRightIcon className="float-right" />

        <Dropdown.Submenu
          position="right"
          className="template-editor-function-dropdown-menu"
        >
          {editorFunctionOptions.map((fnItem) => (
            <Dropdown.Item
              key={fnItem.label}
              onClick={() => handleClick('function', fnItem.apply)}
            >
              _.{fnItem.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Submenu>
      </Dropdown.Item>

      <Dropdown.Item onClick={() => handleClick('execution-block', '')}>
        Execution block
      </Dropdown.Item>
    </Dropdown>
  );
};
