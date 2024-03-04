import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../src/utils/tokens';
import { Stack } from 'expo-router';
import { Heading } from 'native-base';
import IconButton from '../src/components/buttons/IconButton';
import Button from '../src/components/buttons/Button';
import FormInput from '../src/components/form/FormInput';

const ForgotPasswordscreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerStyle: { backgroundColor: COLORS.secondaryLight}, headerTintColor: COLORS.tertiary, title: 'Forgot password' }} />
      <View style={styles.rootContainer}>
        <Text>ForgotPasswordscreen</Text>
        <Pressable style={styles.selectBoxContainer}>
          <IconButton name='mail-open' onPress={() => {}} size='Big' showBackground type='Primary' style={{ borderRadius: 5 }} />
          <View>
            <Heading size="md" color={COLORS.tertiary} >Reset via Email</Heading>
            <Text style={{fontSize: 12, color: COLORS.text}}>Select option to receive password code</Text>
          </View>
          <IconButton name='checkmark' onPress={() => {}} size='Small' type='Tertiary' rounded />
        </Pressable>
        <Pressable style={styles.selectBoxContainerChecked}>
          <IconButton name='chatbox' onPress={() => {}} size='Big' showBackground type='Primary' style={{ borderRadius: 5 }} />
          <View>
            <Heading size="md" color={COLORS.tertiary} >Reset via Sms</Heading>
            <Text style={{fontSize: 12, color: COLORS.text}}>Select option to receive password code</Text>
          </View>
          <IconButton name='checkmark' onPress={() => {}} size='Small' type='Tertiary' rounded showBackground />
        </Pressable>

        <FormInput icon='mail' errorMessage='No error' id='noid' isValid onChange={() => {}} placeholder='Enter email' type='text' value='' variant='Outline' />
        <FormInput icon='call' errorMessage='No error' id='noid' isValid onChange={() => {}} placeholder='Enter phone number' type='text' value='' variant='Outline' />

        <Button label='Send' onPress={() => {}} size='Medium' type='Tertiary' variant='Filled' fullWidth />

        <Button label='Did not receive code? Resend' onPress={() => {}} size='Medium' type='Tertiary' variant='Ghost' dense selfAlignment='center' textStyle={{
          isBold: true,
          isUnderline: true
        }} />
      </View>
    </>
  )
}

export default ForgotPasswordscreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'flex-start',
    gap: 10
  },
  selectBoxContainer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.text
  },
  selectBoxContainerChecked: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.tertiary
  }
})