const lang_backend_mapping = [
    {
        lang: "g++",
        lang_id: "GXX"
    },
    {
        lang: "gcc",
        lang_id: "GCC"
    },
    {
        lang: "java",
        lang_id: "JAVA"
    },
    {
        lang: "python(cpython)",
        lang_id: "CPY"
    },
    {
        lang: "python(pypy)",
        lang_id: "PYPY"
    },
    {
        lang: "go",
        lang_id: "GO"
    },
    {
        lang: "Javascript",
        lang_id: "JS"
    },
];
const language_long_name = {
    "GXX": "g++",
    "GCC": "gcc",
    "JAVA": "java",
    "CPY": "python(cpy)",
    "PYPY": "python(pypy)",
    "GO": "go",
    "JS": "javascript",
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
    verdict_long_name,
    verdict_font_color,
}