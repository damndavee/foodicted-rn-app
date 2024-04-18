import { PropsWithChildren, createContext, useContext, useState } from "react";

interface SelectableListContextType {};

export const SelectableListContext = createContext<SelectableListContextType | null>(null);

export const SelectableListContextProvider = (props: PropsWithChildren) => {
    return (
        <SelectableListContext.Provider value={{}}>
            {props.children}
        </SelectableListContext.Provider>
    )
};

export const useCheckIfItemIsInsideList = () => {
    const context = useContext(SelectableListContext);

    if(!context) {
        throw new Error('ListItem must be used within SelectableList component');
    }
}