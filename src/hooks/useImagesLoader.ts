import { Asset } from "expo-asset";
import { useEffect, useState } from "react"

const useImagesLoader = (images: string[]) => {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        Asset.loadAsync(images).then(() => setLoaded(true)).catch(setError);
    }, [])

    return [loaded, error];
}

export default useImagesLoader;