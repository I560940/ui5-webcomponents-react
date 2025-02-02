'use client';

import '@ui5/webcomponents/dist/MultiInput.js';
import type {
  IInputSuggestionItem,
  InputSuggestionItemPreviewEventDetail,
  InputSuggestionItemSelectEventDetail
} from '@ui5/webcomponents/dist/Input.js';
import type { MultiInputTokenDeleteEventDetail } from '@ui5/webcomponents/dist/MultiInput.js';
import type InputType from '@ui5/webcomponents/dist/types/InputType.js';
import type ValueState from '@ui5/webcomponents-base/dist/types/ValueState.js';
import type { ReactNode } from 'react';
import { withWebComponent } from '../../internal/withWebComponent.js';
import type { CommonProps, Ui5CustomEvent, Ui5DomRef, UI5WCSlotsNode } from '../../types/index.js';

interface MultiInputAttributes {
  /**
   * Defines the accessible ARIA name of the component.
   */
  accessibleName?: string;

  /**
   * Receives id(or many ids) of the elements that label the input.
   */
  accessibleNameRef?: string;

  /**
   * Defines whether the component is in disabled state.
   *
   * **Note:** A disabled component is completely noninteractive.
   * @default false
   */
  disabled?: boolean;

  /**
   * Sets the maximum number of characters available in the input field.
   *
   * **Note:** This property is not compatible with the ui5-input type InputType.Number. If the ui5-input type is set to Number, the maxlength value is ignored.
   * @default undefined
   */
  maxlength?: number | undefined;

  /**
   * Determines the name with which the component will be submitted in an HTML form.
   *
   * **Important:** For the `name` property to have effect, you must add the following import to your project:
   * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   *
   * **Note:** When set, a native `input` HTML element
   * will be created inside the component so that it can be submitted as
   * part of an HTML form. Do not use this property unless you need to submit a form.
   */
  name?: string;

  /**
   * Defines whether the value will be autcompleted to match an item
   * @default false
   */
  noTypeahead?: boolean;

  /**
   * Defines a short hint intended to aid the user with data entry when the
   * component has no value.
   */
  placeholder?: string;

  /**
   * Defines whether the component is read-only.
   *
   * **Note:** A read-only component is not editable,
   * but still provides visual feedback upon user interaction.
   * @default false
   */
  readonly?: boolean;

  /**
   * Defines whether the component is required.
   * @default false
   */
  required?: boolean;

  /**
   * Defines whether the clear icon of the input will be shown.
   * @default false
   */
  showClearIcon?: boolean;

  /**
   * Defines whether the component should show suggestions, if such are present.
   *
   * **Note:** You need to import the `InputSuggestions` module
   * from `"@ui5/webcomponents/dist/features/InputSuggestions.js"` to enable this functionality.
   * @default false
   */
  showSuggestions?: boolean;

  /**
   * Determines whether a value help icon will be visualized in the end of the input.
   * Pressing the icon will fire `value-help-trigger` event.
   * @default false
   */
  showValueHelpIcon?: boolean;

  /**
   * Defines the HTML type of the component.
   *
   * **Notes:**
   *
   * - The particular effect of this property differs depending on the browser
   * and the current language settings, especially for type `Number`.
   * - The property is mostly intended to be used with touch devices
   * that use different soft keyboard layouts depending on the given input type.
   * @default "Text"
   */
  type?: InputType | keyof typeof InputType;

  /**
   * Defines the value of the component.
   *
   * **Note:** The property is updated upon typing.
   */
  value?: string;

  /**
   * Defines the value state of the component.
   * @default "None"
   */
  valueState?: ValueState | keyof typeof ValueState;
}

interface MultiInputDomRef extends Required<MultiInputAttributes>, Ui5DomRef {
  /**
   * Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.
   * @returns {void}
   */
  openPicker: () => void;

  /**
   * The suggestion item on preview.
   */
  readonly previewItem: IInputSuggestionItem | null;
}

interface MultiInputPropTypes
  extends MultiInputAttributes,
    Omit<
      CommonProps,
      | keyof MultiInputAttributes
      | 'children'
      | 'icon'
      | 'tokens'
      | 'valueStateMessage'
      | 'onChange'
      | 'onInput'
      | 'onSuggestionItemPreview'
      | 'onSuggestionItemSelect'
      | 'onTokenDelete'
      | 'onValueHelpTrigger'
    > {
  /**
   * Defines the suggestion items.
   *
   * **Note:** The suggestions would be displayed only if the `showSuggestions`
   * property is set to `true`.
   *
   * **Note:** The `<SuggestionItem>` and `<SuggestionGroupItem>` are recommended to be used as suggestion items.
   *
   * **Note:** Importing the Input Suggestions Support feature:
   *
   * `import "@ui5/webcomponents/dist/features/InputSuggestions.js";`
   *
   * automatically imports the `<SuggestionItem>` and `<SuggestionGroupItem>` for your convenience.
   */
  children?: ReactNode | ReactNode[];

  /**
   * Defines the icon to be displayed in the component.
   *
   * __Note:__ The content of the prop will be rendered into a [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) by assigning the respective [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot) attribute (`slot="icon"`).
   * Since you can't change the DOM order of slots when declaring them within a prop, it might prove beneficial to manually mount them as part of the component's children, especially when facing problems with the reading order of screen readers.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base-handling-slots--docs).
   */
  icon?: UI5WCSlotsNode;

  /**
   * Defines the component tokens.
   *
   * __Note:__ The content of the prop will be rendered into a [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) by assigning the respective [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot) attribute (`slot="tokens"`).
   * Since you can't change the DOM order of slots when declaring them within a prop, it might prove beneficial to manually mount them as part of the component's children, especially when facing problems with the reading order of screen readers.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base-handling-slots--docs).
   */
  tokens?: UI5WCSlotsNode;

  /**
   * Defines the value state message that will be displayed as pop up under the component.
   *
   * **Note:** If not specified, a default text (in the respective language) will be displayed.
   *
   * **Note:** The `valueStateMessage` would be displayed,
   * when the component is in `Information`, `Warning` or `Error` value state.
   *
   * **Note:** If the component has `suggestionItems`,
   * the `valueStateMessage` would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
   *
   * __Note:__ The content of the prop will be rendered into a [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) by assigning the respective [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot) attribute (`slot="valueStateMessage"`).
   * Since you can't change the DOM order of slots when declaring them within a prop, it might prove beneficial to manually mount them as part of the component's children, especially when facing problems with the reading order of screen readers.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base-handling-slots--docs).
   */
  valueStateMessage?: UI5WCSlotsNode;
  /**
   * Fired when the input operation has finished by pressing Enter or on focusout.
   */
  onChange?: (event: Ui5CustomEvent<MultiInputDomRef>) => void;

  /**
   * Fired when the value of the component changes at each keystroke,
   * and when a suggestion item has been selected.
   */
  onInput?: (event: Ui5CustomEvent<MultiInputDomRef>) => void;

  /**
   * Fired when the user navigates to a suggestion item via the ARROW keys,
   * as a preview, before the final selection.
   */
  onSuggestionItemPreview?: (event: Ui5CustomEvent<MultiInputDomRef, InputSuggestionItemPreviewEventDetail>) => void;

  /**
   * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
   */
  onSuggestionItemSelect?: (event: Ui5CustomEvent<MultiInputDomRef, InputSuggestionItemSelectEventDetail>) => void;

  /**
   * Fired when a token is about to be deleted.
   */
  onTokenDelete?: (event: Ui5CustomEvent<MultiInputDomRef, MultiInputTokenDeleteEventDetail>) => void;

  /**
   * Fired when the value help icon is pressed
   * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
   */
  onValueHelpTrigger?: (event: Ui5CustomEvent<MultiInputDomRef>) => void;
}

/**
 * A `MultiInput` field allows the user to enter multiple values, which are displayed as `Token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Select a value from the suggestion list (`suggestion-item-select` event is fired)
 *
 *
 *
 * __Note__: This is a UI5 Web Component! [Repository](https://github.com/SAP/ui5-webcomponents) | [Documentation](https://sap.github.io/ui5-webcomponents/playground/)
 */
const MultiInput = withWebComponent<MultiInputPropTypes, MultiInputDomRef>(
  'ui5-multi-input',
  ['accessibleName', 'accessibleNameRef', 'maxlength', 'name', 'placeholder', 'type', 'value', 'valueState'],
  ['disabled', 'noTypeahead', 'readonly', 'required', 'showClearIcon', 'showSuggestions', 'showValueHelpIcon'],
  ['icon', 'tokens', 'valueStateMessage'],
  ['change', 'input', 'suggestion-item-preview', 'suggestion-item-select', 'token-delete', 'value-help-trigger'],
  () => import('@ui5/webcomponents/dist/MultiInput.js')
);

MultiInput.displayName = 'MultiInput';

export { MultiInput };
export type { MultiInputDomRef, MultiInputPropTypes };
