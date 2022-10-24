import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Pressable, Text, TouchableHighlight, View} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  // 페이지: 페이지의 parameter
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={onClick}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 40,
            backgroundColor: 'blue',
          }}>
          <Text style={{color: 'white'}}>Home Screen</Text>
        </Pressable>
      </View>
      <View style={{flex: 2, backgroundColor: 'orange'}}>
        <Text>Second</Text>
      </View>
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight underlayColor="orange" onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
// Stack 은 암기

function App() {
  return (
    <NavigationContainer>
      {/* NavigationContainer 내부적으로 safe-area-view 가 있음 */}
      <Stack.Navigator initialRouteName="Home">
        {/* 스크린들의 묶음인데 어느 스크린(Home)이 기준이 될 것인지 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        {/* screen 이 component 에게 router 와 navigation 을 전달해줌 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// TouchableOpacity:
// 이벤트를 listen 할 준비가 되어있는 View tag
// TouchableHighlight:
// 클릭했을때 배경색을 지정가능한 속성 등 TouchableOpacity 보다 많은 속성을 가지지만,
// TouchableOpacity 를 더 많이 사용함
// TouchableWithoutFeedback:
// 터치하고 이벤트는 발생하지만, UI 상에서의 변화는 없음.
// Pressable:
// 새로운 Component 로 TouchableWithoutFeedback와 비슷하지만,
// 누르고 있는 시간, hitSlop 등 더 많은 속성이 있음.
// IOS 와 And. 에서 같게 보여서 TouchableHighlight 보다 좋음.
