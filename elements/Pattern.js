import React, { Component } from "react";
import { requireNativeComponent } from "react-native";
import extractTransform from "../lib/extract/extractTransform";
import extractViewBox from "../lib/extract/extractViewBox";
import units from "../lib/units";

export default class extends Component {
    static displayName = "Pattern";

    setNativeProps = props => {
        this.root.setNativeProps(props);
    };

    render() {
        const { props } = this;
        const {
            patternTransform,
            transform,
            id,
            x,
            y,
            width,
            height,
            patternUnits,
            patternContentUnits,
            children,
            viewBox,
            preserveAspectRatio,
        } = props;

        const extractedTransform = extractTransform(patternTransform || transform || props);

        return (
            <RNSVGPattern
                ref={ele => {
                    this.root = ele;
                }}
                name={id}
                x={x}
                y={y}
                width={width}
                height={height}
                matrix={extractedTransform}
                patternTransform={extractedTransform}
                patternUnits={units[patternUnits] || 0}
                patternContentUnits={
                    patternContentUnits ? units[patternContentUnits] : 1
                }
                {...extractViewBox({ viewBox, preserveAspectRatio })}
            >
                {children}
            </RNSVGPattern>
        );
    }
}

const RNSVGPattern = requireNativeComponent("RNSVGPattern");
