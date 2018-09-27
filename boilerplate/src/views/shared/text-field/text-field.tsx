import * as React from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../../theme"
import { translate } from "../../../i18n"
import { Text } from "../text"
import { TextFieldProps } from "./text-field.props"
import { reduce } from "ramda"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  if (Array.isArray(styleOverride)) {
    return reduce((acc,term) => {
      return { ...acc, ...term }
    }, style, styleOverride)
  } else {
    return {
      ...style,
      ...styleOverride,
    }
  }
}


/**
 * A component which has a label and an input together.
 */
export class TextField extends React.Component<TextFieldProps, {}> {
  render() {
    const {
      placeholderTx,
      placeholder,
      labelTx,
      label,
      preset = "default",
      style: styleOverride,
      inputStyle: inputStyleOverride,
      ...rest,
    } = this.props
    let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
    containerStyle = enhance(containerStyle, styleOverride)

    let inputStyle: TextStyle = INPUT
    inputStyle = enhance(inputStyle, inputStyleOverride)
    const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

    return (
      <View style={containerStyle}>
        <Text preset="fieldLabel" tx={labelTx} text={label} />
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
        />
      </View>
    )
  }
}
