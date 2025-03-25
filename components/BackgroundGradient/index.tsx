import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const BackgroundGradient = () => {
  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        <Svg
          height="100%"
          width="100%"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Defs>
            <RadialGradient
              id="radialGradient"
              gradientUnits="objectBoundingBox"
              cx={1}
              cy={0}
              r={1}
            >
              <Stop offset="0" stopColor="purple" stopOpacity={0.3} />
              <Stop offset="1" stopColor="purple" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect
            width="100%"
            height="100%"
            fill="url(#radialGradient)"
          />
        </Svg>
      </View>
    </>
  )
}

export default BackgroundGradient;
