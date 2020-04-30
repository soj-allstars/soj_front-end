const language_long_name = {
    "GXX": "C++17 (G++ 8.3.0)",
    "GCC": "C11 (GCC 8.3.0)",
    "JAVA": "Java 11 (OpenJDK 11.0.5)",
    "CPY": "Python 3.8 (CPython)",
    "PYPY": "Python 3.6 (PyPy 7.3.1)",
};

// todo: 生成
const lang_backend_mapping = function () {
    let ret = [];
    for (let [key, value] of Object.entries(language_long_name)) {
        let obj = {
            lang: value,
            lang_id: key,
        };
        ret.push(obj);
    }
    return ret;
}();


// 用于代码高亮
const language_formal_name = {
        "GXX": "c++",
        "GCC": "c",
        "JAVA": "java",
        "CPY": "python",
        "PYPY": "python",
};

const verdict_long_name = {
    "AC": "Accepted",
    "WA": "Wrong Answer",
    "CE": "Compile Error",
    "RE": "Runtime Error",
    "SE": "System Error",
    "MLE": "Memory Limit Exceeded",
    "TLE": "Time Limit Exceeded",
    "OLE": "Output Limit Exceeded",
    "PE": "Presentation Error",
    "PENDING": "Pending",
};
const verdict_font_color = {
    "AC": "green--text text--darken-1",
    "WA": "red--text text--darken-3",
    "CE": "deep-orange--text text--darken-1",
    "RE": "deep-orange--text text--darken-1",
    "SE": "deep-orange--text text--darken-1",
    "MLE": "amber--text text--darken-3",
    "TLE": "amber--text text--darken-3",
    "OLE": "amber--text text--darken-3",
    "PE": "light-blue--text text--darken-4",
    "PENDING": "blue-grey--text text--lighten-1",
};

export {
    lang_backend_mapping,
    language_long_name,
    language_formal_name,
    verdict_long_name,
    verdict_font_color,
}