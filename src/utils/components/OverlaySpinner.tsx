import { StyleSheet, View } from 'react-native';
import { Text, Spinner } from 'native-base';
import tokens from '../tokens';
import { useAppSelector } from '../../storage/store';
import { selectLoadingState } from '../../storage/store/global/global.reducer';

const OverlaySpinner = () => {
    const loadingSelector = useAppSelector(selectLoadingState);

    if(!loadingSelector.isSpinnerVisible) {
        return null;
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.spinnerContainer}>
                <Spinner size='lg' color={tokens.color.text} />
                <Text style={styles.loadingText}>
                    {loadingSelector.loadingMsg}
                </Text>
            </View>
        </View>
    )
}

export default OverlaySpinner

const styles = StyleSheet.create({
    rootContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: tokens.spacing.medium,
        backgroundColor: tokens.color.backdrop,
    },
    loadingText: {
        color: tokens.color.text,
        fontSize: tokens.fontSize.medium
    },
})