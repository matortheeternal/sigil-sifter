const language = (acronym, name, expr) => ({
    acronyms: Array.isArray(acronym) ? acronym : [acronym],
    name,
    expr: expr || new RegExp('^' + name + '$', 'i')
});

// https://cran.r-project.org/web/packages/scryr/vignettes/languages.html
export default [
    language('en', 'English'),
    language('es', 'Spanish'),
    language('fr', 'French'),
    language('de', 'German'),
    language('it', 'Italian'),
    language('pt', 'Portuguese'),
    language(['ja', 'jp'], 'Japanese'),
    language(['ko', 'kr'], 'Korean'),
    language('ru', 'Russian'),
    language(['zhs', 'cs'], 'Chinese (Simplified)',
        /^(Chinese \(Simplified\)|Simplified Chinese)$/i
    ),
    language(['zht', 'ct'], 'Chinese (Traditional)',
        /^(Chinese \(Traditional\)|Traditional Chinese)$/i
    ),
    language('he', 'Hebrew'),
    language('la', 'Latin'),
    language('grc', 'Ancient Greek'),
    language('ar', 'Arabic'),
    language('sa', 'Sanskrit'),
    language('ph', 'Phyrexian')
];
