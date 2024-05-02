import { StyleSheet, Text, View } from 'react-native'
import { Heading, Pressable } from "native-base"
import { ListItemProps } from "../../types/components/props/listItem"
import tokens from '../../utils/tokens';

import Icon from '../../components/utils/Icon';
import { useCheckIfItemIsInsideList } from '../../context/SelectableList';
import { StyleProps } from '../../types/components/generic';

const ListItem = (props: ListItemProps) => {
    useCheckIfItemIsInsideList();

    const containerStyle: StyleProps = {
        borderColor: props.selected? tokens.color.tertiary.default : tokens.color.text,
        elevation: props.selected ? 5 : 0,
        backgroundColor: props.selected ? tokens.color.primary.default  : 'transparent',
        flexDirection: props.orientation === 'Horizontal' ? 'row' : 'column',
        width: props.orientation === 'Horizontal' ? '100%' : '48.5%',
    };

    const copyContainerStyle: StyleProps = {
        alignItems: props.orientation === 'Horizontal' ? 'flex-start' : 'center',
        gap: props.orientation === 'Horizontal' ? 2 : 10
    }

    return (
        <Pressable style={[styles.listItemButtonContainer, {...containerStyle}]} pointerEvents='box-only' onPress={() => props.onPress(props.id)}>
            <Icon 
                name={props.icon} 
                radius={10} 
                size={props.orientation === 'Horizontal' ? 'Small' : 'Large'} 
                type='Tertiary' 
                variant={props.orientation === 'Horizontal' ? 'Filled' : 'Ghost'} 
            />
            <View style={{...copyContainerStyle}}>
                <Heading color={tokens.color.tertiary.default} size='md'>{props.headingText}</Heading>
                <Text style={styles.bodyText}>{props.bodyText}</Text>
            </View>
        </Pressable>
    )
};

export default ListItem;

const styles = StyleSheet.create({
    listItemButtonContainer: {
        borderWidth: 2,
        padding: tokens.spacing.small,
        alignItems: 'center',
        borderRadius: tokens.radius.big,
        gap: tokens.spacing.medium,
    },
    bodyText: {
        fontSize: tokens.fontSize.small,
        color: tokens.color.text,
        textAlign: 'center'
    },
})