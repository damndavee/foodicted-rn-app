import { Icon } from "../generic";

export type ListItemInputData = {
    icon: Icon,
    headingText: string;
    bodyText: string;
    id: string;
}

export type ListItemProps = ListItemInputData & {
    onPress: (arg0: string) => void;
    selected: boolean;
    orientation: 'Horizontal' | 'Vertical';
};

export interface SelectableListProps {
    itemOrientation: 'Horizontal' | 'Vertical';
    data: ListItemInputData[],
    multiSelect?: boolean;
    background?: boolean
};