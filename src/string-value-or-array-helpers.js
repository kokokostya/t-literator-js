class StringValueOrArrayHelpers {
    /// E.g. "abc" will become "Abc", "...xyz" will become "...Xyz"
    static toTitleCase(valOrArr) {
        if (valOrArr == null) {
            return null;
        }
        
        // recursive calls for each array's element:
        if (Array.isArray(valOrArr)) {
            const titleCasedArr = [...valOrArr];
    
            for (let i = 0; i < titleCasedArr.length; ++i) {
                titleCasedArr[i] = StringValueOrArrayHelpers.toTitleCase(titleCasedArr[i]);
            }
    
            return titleCasedArr;
        }
        
        const isNonCased = c => c != null 
                ? c.toLowerCase() === c.toUpperCase() 
                : true;

        // the arg is a string value:
        for (let i = 0; i < valOrArr.length; ++i) {
            if (isNonCased(valOrArr.charAt(i))) {
                continue; // until first 'uppercasable' char
            }
    
            return valOrArr.slice(0, i + 1).toUpperCase() + valOrArr.slice(i + 1);
        }
        return valOrArr;
    }

    /// E.g. "abc" will become "ABC", "...xyz" will become "...XYZ"
    static toUpperCase(valOrArr) {
        if (valOrArr == null) {
            return null;
        }
        
        // recursive calls for each array's element:
        if (Array.isArray(valOrArr)) {
            const upperCasedArr = [...valOrArr];
    
            for (let i = 0; i < upperCasedArr.length; ++i) {
                upperCasedArr[i] = StringValueOrArrayHelpers.toUpperCase(upperCasedArr[i]);
            }
    
            return upperCasedArr;
        }
    
        // the arg is a string value:
        return valOrArr.toUpperCase();
    }

    static toDiacriticless(valOrArr) {
        if (valOrArr == null) {
            return null;
        }
    
        // recursive calls for each array's element:
        if (Array.isArray(valOrArr)) {
            const diacriticlessArr = [...valOrArr];
    
            for (let i=0; i<diacriticlessArr.length; ++i) {
                diacriticlessArr[i] = StringValueOrArrayHelpers.toDiacriticless(diacriticlessArr[i]);
            }
    
            return diacriticlessArr;
        }
    
        // the arg is a string value:

        const someSpecialCases = {
            "ł": "l", "Ł": "L",
            "ı": "i", "İ": "I"
        };

        return someSpecialCases[valOrArr] != null 
            ? someSpecialCases[valOrArr] 
            : valOrArr.normalize("NFD").replace(/\p{Diacritic}/gu, ""); 
    }
}

// If it's Node.js:
if (typeof window === 'undefined') { module.exports = StringValueOrArrayHelpers; }