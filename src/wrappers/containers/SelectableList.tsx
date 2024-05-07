import { StyleSheet, View } from 'react-native';
import { ListItemInputData, SelectableListProps } from "../../types/components/props/listItem";
import { useEffect, useState } from 'react';
import ListItem from '../items/ListItem';
import { SelectableListContextProvider } from '../../context/SelectableList';
import tokens from '../../utils/tokens';

const SelectableList = (props: SelectableListProps) => {
    useEffect(() => {
        if(!props.multiSelect) {
            setSelectedItemIds([props.data[0].id]);
        }
    }, []);

    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    const handleSelectItem = (incommingId: string) => {
        if(!props.multiSelect) {
            setSelectedItemIds([incommingId]);
            return;
        };

        let selectedItemIdsCopy = [...selectedItemIds];
        const alreadySelectedItemIndex = selectedItemIds.findIndex(id => id === incommingId);

        if(alreadySelectedItemIndex > -1) { 
            selectedItemIdsCopy.splice(alreadySelectedItemIndex, 1);
        } else {
            selectedItemIdsCopy.push(incommingId);
        }

        setSelectedItemIds(selectedItemIdsCopy);
    }

    const renderData = () => {
        return props.data.map(item => {
            const isItemSelected = selectedItemIds.find(id => id === item.id);
            return <ListItem orientation={props.itemOrientation} bodyText={item.bodyText} headingText={item.headingText} icon={item.icon} onPress={handleSelectItem} id={item.id} key={item.id} selected={!!isItemSelected} />
        });
    };

    return (
        <SelectableListContextProvider>
            <View style={[styles.listContainer, { flexDirection: props.itemOrientation === 'Horizontal' ? 'column' : 'row' }]}>
                {renderData()}
            </View>
        </SelectableListContextProvider>
    )
};

export default SelectableList;

const styles = StyleSheet.create({
    listContainer: {
        gap: tokens.spacing.medium,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
    }
});
