import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import { storiesOf } from '@storybook/react';

import AccordionStory from './accordion';
import AutoCompleteStory from './autocomplete';
import BannersStory from './banners';
import ButtonsStory from './buttons';
import CheckboxStory from './checkbox';
import ChipStory from './chip';
import ContentHighlightStory from './content-highlight';
import DayPickerStory from './day-picker';
import DateInputStory from './date-input';
import DropzoneStory from './dropzone';
import FileUploaderStory from './file-uploader';
import FormsStory from './forms';
import GridStory from './grid';
import IconsStory from './icons';
import LinkStory from './link';
import NotificationStory from './notification';
import PaginationStory from './pagination';
import PopupStory from './popup';
import RadioStory from './radiobutton';
import ResponsiveTableStory from './responsive-table';
import SelectStory from './select';
import SliderStory from './slider';
import StampStory from './stamp';
import SwitchStory from './switch';
import TabStory from './tabs';
import TextStory from './text';
import TooltipStory from './tooltip';
import WizardStory from './wizard';

// import AvatarStory from './avatar';
storiesOf('Accordion', AccordionStory);
storiesOf('AutoComplete', AutoCompleteStory);
storiesOf('Banners', BannersStory);
storiesOf('Button', ButtonsStory);
storiesOf('Chip', ChipStory);
storiesOf('CheckBox', CheckboxStory);
storiesOf('ContentHighlight', ContentHighlightStory);
storiesOf('DayPicker', DayPickerStory);
storiesOf('DateInput', DateInputStory);
storiesOf('Dropzone', DropzoneStory);
storiesOf('Grid', GridStory);
storiesOf('FileUploader', FileUploaderStory);
// storiesOf('Avatar', AvatarStory);
storiesOf('Icon', IconsStory);
storiesOf('Icon', TextStory);
storiesOf('Forms', FormsStory);
storiesOf('Link', LinkStory);
storiesOf('Notification', NotificationStory);
storiesOf('Pagination', PaginationStory);
storiesOf('Popup', PopupStory);
storiesOf('RadioButton', RadioStory);
storiesOf('ResponsiveTable', ResponsiveTableStory);
storiesOf('Select', SelectStory);
storiesOf('Slider', SliderStory);
storiesOf('Stamp', StampStory);
storiesOf('Switcher', SwitchStory);
storiesOf('Tooltip', TooltipStory);
storiesOf('Tab', TabStory);
storiesOf('Wizard', WizardStory);
