import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../App"
import DismissKeyboardView from '../components/DismissKeyboardView';


type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>();
  const passwordRef = useRef<TextInput | null>();
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호을 입력해주세요');
    }
    Alert.alert('알림', '로그인 되었습니다.')}
  ,[email, password])
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, [])
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, [])

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation])

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="이메일을 입력하세요"
          placeholderTextColor="#666"
          importantForAutofill='yes'
          autoComplete='email'
          textContentType='emailAddress'
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          // 엔터치면 passwordRef 에 focus
          // useRef 사용시 주의점
          // 1. component 속성에 Ref를 지정하고 사용해야 한다.
          // 2. ref변수를 바로 사용할 수 없다. current property를 사용해야 한다.
          // 3. 변경되어도 Component가 다시 랜더링 되지 않는다(useState와 다른점)

          blurOnSubmit={false}
          // TextInput 컴포넌트는 기본적으로 submit을 하고나면 blur처리된다.
          // focus를 잃고 자판이 자동적으로 사라지는데,
          // 그것을 막기 위해서는 blurOnSubmit 속성을 변경해주면 된다.
          // 기본값은 true이며, blurOnSubmit={false}로 바꿔주면 된다.

          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밃번호를 입력하세요"
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
          placeholderTextColor="#666"
          importantForAutofill='yes'
          autoComplete='password'
          textContentType='password'
          returnKeyType="send"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          // 엔터치면 무슨 동작을 할 것인지 -> 로그인 버튼 클릭 함수
        /> 
      </View>
      <View style={styles.buttonZone}>
        <Pressable 
          onPress={onSubmit} 
          style={!canGoNext ? styles.loginButton : [styles.loginButton, styles.loginButtonActive]}
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  
  )
}

const styles = StyleSheet.create({
  inputWrapper:{
    padding: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label:{
    fontWeight:'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton:{
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive:{
    backgroundColor:'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonZone:{
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SignIn;