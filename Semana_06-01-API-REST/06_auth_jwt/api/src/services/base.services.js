class BaseService {
    mapKeysToColumns = (obj, keysMap) => {

        if (obj === undefined || obj === null) {
            return null;
        }

        if (Object.keys(obj).length === 0) {
            return null;
        }

        const res = Object.entries(obj).reduce((acc, [key, value]) => {
            const column = keysMap[key];
            if (column) acc[column] = value;
            return acc;
        }, {});

        return res;
    };
}

export default BaseService;
